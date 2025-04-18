
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
import { useState } from "react";

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

export default function CardLoads() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const accountFrom = searchParams.get("accountFrom");

  const { data: cards, isLoading } = useQuery({
    queryKey: ["loadAllocatedCards", searchTerm],
    queryFn: async () => {
      const { data, error } = await supabase
        .rpc('search_load_allocated', { search_term: searchTerm });
      
      if (error) throw error;
      return data as AccountCard[];
    }
  });

  const { data: clientSettings } = useQuery({
    queryKey: ["loadClient"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('get_load_client');
      if (error) throw error;
      return data[0] as ClientSettings;
    }
  });

  const handleLoadFundsClick = () => {
    navigate(`/load-funds-from`);
  };

  const handleToClick = () => {
    navigate(`/load-funds-from/to?accountFrom=${accountFrom}`);
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
                    <Input
                      type="number"
                      placeholder="0.00"
                      className="w-32"
                      min={clientSettings?.clientMinCardLoad || 0}
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>${clientSettings?.clientTransferFee.toFixed(2)}</TableCell>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}
