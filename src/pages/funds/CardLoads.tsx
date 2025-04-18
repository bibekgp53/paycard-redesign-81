
import { useState, useMemo } from "react";
import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { format } from "date-fns";

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

const CardLoads = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const accountFrom = searchParams.get("accountFrom");
  const [amountInputs, setAmountInputs] = useState<AmountInputs>({});
  const [page, setPage] = useState(1);
  const [effectiveDate, setEffectiveDate] = useState<"immediate" | "delay">("immediate");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const pageSize = 5; // Items per page

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
    
    return `Load amount must be between R ${minLoad.toFixed(2)} - R ${maxAllowedLoad.toFixed(2)}`;
  };

  const isAmountValid = (cardId: string, cardBalance: number) => {
    const amount = amountInputs[cardId];
    if (amount === undefined || amount === null) return true;
    
    if (clientSettings) {
      const minAmount = clientSettings.clientMinCardLoad;
      const maxAmount = clientSettings.clientMaxBalance - cardBalance;
      return amount >= minAmount && amount <= maxAmount;
    }
    return true;
  };

  const getFeeForCard = (cardId: string): string => {
    const amount = amountInputs[cardId];
    if (amount === undefined || amount === null || !clientSettings) {
      return "R 0.00";
    }
    
    // Only calculate fee if amount is valid
    const card = cards?.find(c => c.id === cardId);
    if (card && isAmountValid(cardId, card.balance)) {
      return `R ${clientSettings.clientTransferFee.toFixed(2)}`;
    }
    
    return "R 0.00";
  };

  // Calculate totals for amount and fee
  const totals = useMemo(() => {
    if (!cards || !clientSettings) return { amount: 0, fee: 0 };
    
    let totalAmount = 0;
    let totalFee = 0;
    
    Object.entries(amountInputs).forEach(([cardId, amount]) => {
      if (amount !== null && amount > 0) {
        const card = cards.find(c => c.id === cardId);
        if (card && isAmountValid(cardId, card.balance)) {
          totalAmount += amount;
          totalFee += clientSettings.clientTransferFee;
        }
      }
    });
    
    return { amount: totalAmount, fee: totalFee };
  }, [amountInputs, cards, clientSettings]);

  // Paginate the cards data
  const paginatedCards = useMemo(() => {
    if (!cards) return [];
    const startIndex = (page - 1) * pageSize;
    return cards.slice(startIndex, startIndex + pageSize);
  }, [cards, page, pageSize]);

  // Calculate total pages
  const totalPages = useMemo(() => {
    if (!cards) return 1;
    return Math.ceil(cards.length / pageSize);
  }, [cards, pageSize]);

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={handleLoadFundsClick}>Load Funds From</BreadcrumbLink>
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
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <Input
            type="text"
            placeholder="Search by cardholder name or card number"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
          />
          
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Load Effective Date</h3>
            <RadioGroup 
              value={effectiveDate} 
              onValueChange={(value) => setEffectiveDate(value as "immediate" | "delay")}
              className="flex space-x-4"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="immediate" id="immediately" />
                <Label htmlFor="immediately">Immediately</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="delay" id="delay" />
                <Label htmlFor="delay">Delay until</Label>
              </div>
            </RadioGroup>
            
            {effectiveDate === "delay" && (
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className="w-[240px] justify-start text-left font-normal"
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className="p-3 pointer-events-auto"
                    disabled={(date) => date < new Date()}
                  />
                </PopoverContent>
              </Popover>
            )}
          </div>
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
                ) : paginatedCards.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">No cards found</TableCell>
                  </TableRow>
                ) : paginatedCards.map((card) => (
                  <TableRow key={card.id}>
                    <TableCell>{card.cardholder}</TableCell>
                    <TableCell>{card.cardNumber}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Input
                              type="number"
                              placeholder="0.00"
                              className={`w-32 ${!isAmountValid(card.id, card.balance) ? 'border-paycard-red ring-1 ring-paycard-red' : ''}`}
                              value={amountInputs[card.id] || ""}
                              onChange={(e) => handleAmountChange(card.id, e.target.value)}
                              min={clientSettings?.clientMinCardLoad || 0}
                              step="0.01"
                            />
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
              {cards && cards.length > 0 && (
                <TableFooter>
                  <TableRow className="bg-muted/50">
                    <TableCell colSpan={2} className="text-right font-medium">Totals:</TableCell>
                    <TableCell className="font-medium">R {totals.amount.toFixed(2)}</TableCell>
                    <TableCell className="font-medium">R {totals.fee.toFixed(2)}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableFooter>
              )}
            </Table>
          </TooltipProvider>
        </div>
        
        {cards && cards.length > pageSize && (
          <Pagination className="mt-4">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  className={page <= 1 ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => (
                <PaginationItem key={pageNum}>
                  <PaginationLink 
                    isActive={page === pageNum}
                    onClick={() => setPage(pageNum)}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  className={page >= totalPages ? "pointer-events-none opacity-50" : ""}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
        
        <div className="mt-6 flex justify-end">
          <Button className="bg-paycard-salmon hover:bg-paycard-salmon-600">
            Process Load
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CardLoads;
