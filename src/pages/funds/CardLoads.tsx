
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { useNavigate, useSearchParams } from "react-router-dom";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useMemo } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { InfoIcon } from "lucide-react";

interface AccountCard {
  id: string;
  accountCardId: number;
  accountCardMtd: number;
  balance: number;
  cardholder: string;
  cardNumber: string;
  ficaValidation: string;
}

interface ClientSettings {
  id: string;
  clientMinCardLoad: number;
  clientMaxBalance: number;
  clientTransferFee: number;
}

interface AmountInputs {
  [key: string]: number | null;
}

export default function CardLoads() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const accountFrom = searchParams.get("accountFrom");
  const [amountInputs, setAmountInputs] = useState<AmountInputs>({});

  const { data: cards, isLoading } = useQuery({
    queryKey: ["loadAllocatedCards", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('search_load_allocated', { search_term: searchTerm });
      
      if (error) throw error;
      
      // Map the snake_case database response to our camelCase interface
      return data.map((item) => ({
        id: item.id,
        accountCardId: item.accountcardid,
        accountCardMtd: item.accountcardmtd,
        balance: item.balance,
        cardholder: item.cardholder,
        cardNumber: item.cardnumber,
        ficaValidation: item.ficavalidation
      })) as AccountCard[];
    }
  });

  const { data: clientSettings } = useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_load_client');
      if (error) throw error;
      
      // Map the snake_case database response to our camelCase interface
      if (data && data.length > 0) {
        return {
          id: data[0].id,
          clientMinCardLoad: data[0].clientmincardload,
          clientMaxBalance: data[0].clientmaxbalance,
          clientTransferFee: data[0].clienttransferfee
        } as ClientSettings;
      }
      return null;
    }
  });

  const handleLoadFundsClick = () => {
    navigate(`/load-funds-from`);
  };

  const handleToClick = () => {
    navigate(`/load-funds-from/to?accountFrom=${accountFrom}`);
  };

  const handleAmountChange = (cardId: string, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    setAmountInputs(prev => ({
      ...prev,
      [cardId]: numValue
    }));
  };

  const getTooltipMessage = (cardBalance: number) => {
    if (!clientSettings) return "";
    
    const maxAllowedLoad = clientSettings.clientMaxBalance - cardBalance;
    const minLoad = clientSettings.clientMinCardLoad;
    
    return `The load amount must be R ${minLoad.toFixed(2)} - R ${maxAllowedLoad.toFixed(2)}`;
  };

  const getFeeForCard = (cardId: string) => {
    const amount = amountInputs[cardId];
    
    if (amount === undefined || amount === null) {
      return "R 0.00";
    }
    
    if (clientSettings && cards) {
      const card = cards.find(c => c.id === cardId);
      if (card) {
        const minAmount = clientSettings.clientMinCardLoad;
        const maxAmount = clientSettings.clientMaxBalance - card.balance;
        
        if (amount >= minAmount && amount <= maxAmount) {
          return `R ${clientSettings.clientTransferFee.toFixed(2)}`;
        }
      }
    }
    
    return "R 0.00";
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleLoadFundsClick}>Load Funds From</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleToClick}>To</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Card Loads</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
          {clientSettings && (
            <span className="block mt-2 text-sm">
              Minimum load amount: ${clientSettings.clientMinCardLoad.toFixed(2)} | 
              Maximum balance: ${clientSettings.clientMaxBalance.toFixed(2)} | 
              Transfer fee: ${clientSettings.clientTransferFee.toFixed(2)}
            </span>
          )}
        </p>
      </Card>

      <Card className="bg-white p-6">
        <div className="mb-4">
          <Input
            type="text"
            placeholder="Search by cardholder name or card number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
        </div>
        <div className="overflow-x-auto">
          <TooltipProvider>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>NAME</TableHead>
                  <TableHead>CARD NUMBER</TableHead>
                  <TableHead>AMOUNT</TableHead>
                  <TableHead>FEE</TableHead>
                  <TableHead>NOTIFY VIA SMS</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">Loading...</TableCell>
                  </TableRow>
                ) : cards?.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.cardholder}</TableCell>
                    <TableCell>{card.cardNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div className="relative w-32">
                              <Input
                                type="number"
                                placeholder="0.00"
                                className="w-full pr-6"
                                value={amountInputs[card.id] || ""}
                                onChange={(e) => handleAmountChange(card.id, e.target.value)}
                                min={clientSettings?.clientMinCardLoad || 0}
                                step="0.01"
                              />
                              <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                                <InfoIcon className="h-4 w-4 text-gray-400" />
                              </div>
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{getTooltipMessage(card.balance)}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </TableCell>
                    <TableCell>{getFeeForCard(card.id)}</TableCell>
                    <TableCell>
                      <Checkbox />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TooltipProvider>
        </div>
      </Card>
    </div>
  );
}
