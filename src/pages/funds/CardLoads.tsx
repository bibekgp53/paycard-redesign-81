import { useState, useMemo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { SearchInput } from "./components/SearchInput";
import { LoadEffectiveDate } from "./components/LoadEffectiveDate";
import { CardsTable } from "./components/CardsTable";
import { CardsPagination } from "./components/CardsPagination";
import { AccountCard, ClientSettings } from "@/graphql/types";

interface AmountInputs {
  [key: string]: number | null;
}

export function CardLoads() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const accountFrom = searchParams.get("accountFrom");
  const [amountInputs, setAmountInputs] = useState<AmountInputs>({});
  const [page, setPage] = useState(1);
  const [effectiveDate, setEffectiveDate] = useState<"immediate" | "delay">("immediate");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const pageSize = 5;

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
      
      // The response is returning an array of objects, so we need to access the first item
      const clientData = Array.isArray(data) ? data[0] : data;
      
      return {
        details: {
          clientMinCardLoad: clientData.clientmincardload,
          clientMaxBalance: clientData.clientmaxbalance,
          clientTransferFee: clientData.clienttransferfee
        },
        profile: {
          fromBalance: 1000, // Setting a default balance of 1000
          fromAccount: Number(clientData.id?.substring(0, 8)) || 123456789
        }
      } as ClientSettings;
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
    
    const maxAllowedLoad = clientSettings.details.clientMaxBalance - cardBalance;
    const minLoad = clientSettings.details.clientMinCardLoad;
    
    return `Load amount must be between R ${minLoad.toFixed(2)} - R ${maxAllowedLoad.toFixed(2)}`;
  };

  const isAmountValid = (cardId: string, cardBalance: number) => {
    const amount = amountInputs[cardId];
    if (amount === undefined || amount === null) return true;
    
    if (clientSettings) {
      const minAmount = clientSettings.details.clientMinCardLoad;
      const maxAmount = clientSettings.details.clientMaxBalance - cardBalance;
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
      return `R ${clientSettings.details.clientTransferFee.toFixed(2)}`;
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
          totalFee += clientSettings.details.clientTransferFee;
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
          {clientSettings ? (
            clientSettings.profile.fromBalance > 0 ? (
              <span className="block mt-2 text-sm">
                Minimum load amount: R{clientSettings.details.clientMinCardLoad.toFixed(2)} | 
                Maximum balance: R{clientSettings.details.clientMaxBalance.toFixed(2)} | 
                Transfer fee: R{clientSettings.details.clientTransferFee.toFixed(2)}
              </span>
            ) : (
              <span className="block mt-2 text-sm">
                The balance available on your profile is R {clientSettings.profile.fromBalance.toFixed(2)}
              </span>
            )
          ) : null}
        </p>
      </Card>

      <Card className="bg-white p-6">
        <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
          <SearchInput 
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
          />
          
          <LoadEffectiveDate
            effectiveDate={effectiveDate}
            selectedDate={selectedDate}
            onEffectiveDateChange={setEffectiveDate}
            onSelectedDateChange={setSelectedDate}
          />
        </div>
        
        <CardsTable
          cards={paginatedCards}
          isLoading={isLoading}
          amountInputs={amountInputs}
          clientSettings={clientSettings}
          onAmountChange={handleAmountChange}
          getFeeForCard={getFeeForCard}
          isAmountValid={isAmountValid}
          getTooltipMessage={getTooltipMessage}
          totals={totals}
        />
        
        {cards && cards.length > pageSize && (
          <CardsPagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        
        <div className="mt-6 flex justify-end">
          <Button className="bg-paycard-salmon hover:bg-paycard-salmon-600">
            Process Load
          </Button>
        </div>
      </Card>
    </div>
  );
}

export default CardLoads;
