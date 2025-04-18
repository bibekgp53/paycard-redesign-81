import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useQuery } from "@apollo/client";
import { GET_USER_HEADER } from "@/graphql/user";
import { UserHeader } from "@/graphql/types";
import { 
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { LoadEffectiveDate } from "./components/LoadEffectiveDate";
import { CardsTable } from "./components/CardsTable";
import { CardsPagination } from "./components/CardsPagination";
import { useLoadClient } from "@/hooks/useLoadClient";
import { useLoadAllocatedCards } from "@/hooks/useLoadAllocatedCards";
import { AccountCard, ClientSettings } from "@/graphql/types";

interface AmountInputs {
  [key: string]: number | null;
}

export function CardLoads() {
  const navigate = useNavigate();
  const [amountInputs, setAmountInputs] = useState<AmountInputs>({});
  const [page, setPage] = useState(1);
  const [effectiveDate, setEffectiveDate] = useState<"immediate" | "delay">("immediate");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const pageSize = 10;
  
  const { data: userHeader } = useQuery<UserHeader>(GET_USER_HEADER);
  const { data: cards, isLoading } = useLoadAllocatedCards();
  const { data: clientSettings } = useLoadClient();

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

  const totalPages = useMemo(() => {
    if (!cards) return 1;
    return Math.ceil(cards.length / pageSize);
  }, [cards, pageSize]);

  const handleContinue = () => {
    // Implement the continue functionality
    // This will be implemented based on the next steps in the flow
    console.log('Continue clicked', { effectiveDate, selectedDate, amountInputs });
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
            <BreadcrumbPage>Card Loads</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
          <span className="block mt-2 text-sm">
            The balance available on your profile is R {userHeader?.balanceAccount.toFixed(2) || '0.00'}
          </span>
        </p>
      </Card>

      <Card className="bg-white p-6">
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
        
        <div className="mt-6 space-y-6">
          <LoadEffectiveDate
            effectiveDate={effectiveDate}
            selectedDate={selectedDate}
            onEffectiveDateChange={setEffectiveDate}
            onSelectedDateChange={setSelectedDate}
          />
          
          <div className="flex justify-end">
            <Button 
              onClick={handleContinue}
              className="bg-paycard-salmon hover:bg-paycard-salmon-600"
            >
              Continue
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

export default CardLoads;
