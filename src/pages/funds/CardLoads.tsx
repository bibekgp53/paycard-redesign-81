import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { useLoadClientQuery } from "@/hooks/useLoadClientQuery";
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
import { useLoadAllocatedCards } from "@/hooks/useLoadAllocatedCards";
import { AccountCard, ClientSettings } from "@/graphql/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AmountInputs {
  [key: string]: number | null;
}

interface SMSInputs {
  [key: string]: boolean;
}

export function CardLoads() {
  const navigate = useNavigate();
  const [amountInputs, setAmountInputs] = useState<AmountInputs>({});
  const [smsInputs, setSmsInputs] = useState<SMSInputs>({});
  const [page, setPage] = useState(1);
  const [effectiveDate, setEffectiveDate] = useState<"immediate" | "delay">("immediate");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const pageSize = 10;
  
  const { data: userHeader } = useUserHeaderQuery();
  const { data: clientSettingsData } = useLoadClientQuery();
  const { data: cards, isLoading } = useLoadAllocatedCards();

  // Safely mirror transferSMSNotificationFee to clientSMSCost in details
  const clientSettings = useMemo(() => {
    if (!clientSettingsData) return null;
    return {
      ...clientSettingsData,
      details: {
        ...clientSettingsData.details,
        transferSMSNotificationFee: clientSettingsData.details.clientSMSCost,
      },
    };
  }, [clientSettingsData]);

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

  // Debug: log smsInputs on each render and when changed
  console.log("smsInputs state:", smsInputs);

  const handleSMSChange = (cardId: string, checked: boolean) => {
    setSmsInputs((prev) => {
      const updated = { ...prev, [cardId]: checked };
      console.log(`smsInputs updated for cardId ${cardId}:`, updated);
      return updated;
    });
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
    const card = cards?.find(c => c.id === cardId);
    if (card && isAmountValid(cardId, card.balance)) {
      return `R ${clientSettings.details.clientTransferFee.toFixed(2)}`;
    }
    return "R 0.00";
  };

  const totals = useMemo(() => {
    if (!cards || !clientSettings) return { amount: 0, fee: 0, smsFee: 0 };
    let totalAmount = 0;
    let totalFee = 0;
    let totalSMS = 0;
    Object.entries(amountInputs).forEach(([cardId, amount]) => {
      const notifySMS = smsInputs[cardId];
      if (amount !== null && amount > 0) {
        const card = cards.find(c => c.id === cardId);
        if (card && isAmountValid(cardId, card.balance)) {
          totalAmount += amount;
          totalFee += clientSettings.details.clientTransferFee;
          if (notifySMS) {
            totalSMS += clientSettings.details.transferSMSNotificationFee;
          }
        }
      }
    });
    return { amount: totalAmount, fee: totalFee, smsFee: totalSMS };
  }, [amountInputs, smsInputs, cards, clientSettings]);

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

  // --- New/Updated: Handle continue, gather all the info and redirect to a confirm page ---
  const handleContinue = () => {
    if (!clientSettings) return;
    const selected = Object.entries(amountInputs)
      .map(([cardId, amount]) => {
        const card = cards?.find(c => c.id === cardId);
        if (
          !card ||
          amount === undefined ||
          amount === null ||
          !isAmountValid(cardId, card.balance) ||
          amount <= 0
        )
          return null;
        const notifySMS = !!smsInputs[cardId];
        return {
          accountCardId: card.accountCardId,
          transferAmount: amount,
          transferFeeAmount: clientSettings.details.clientTransferFee,
          transferSMSNotificationFee: notifySMS ? clientSettings.details.transferSMSNotificationFee : 0,
          cardholder: card.cardholder,
          cardNumber: card.cardNumber,
          notifyViaSMS: notifySMS,
        };
      })
      .filter(Boolean);
    if (selected.length === 0) {
      // Optionally display a toast error here.
      return;
    }
    navigate("/load-funds-from/card-loads/confirm-load", {
      state: {
        cards: selected,
        effectiveDate,
        selectedDate,
      },
    });
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
            The balance available on your profile is R {userHeader?.balanceAccount?.toFixed(2) || '0.00'}
          </span>
        </p>
      </Card>

      <Card className="bg-white p-6">
        <div className="overflow-x-auto">
          <table className="w-full table-auto border mt-2 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b uppercase">Cardholder</th>
                <th className="py-2 px-4 border-b uppercase">Card Number</th>
                <th className="py-2 px-4 border-b uppercase">Amount</th>
                <th className="py-2 px-4 border-b uppercase">Fee</th>
                <th className="py-2 px-4 border-b uppercase">Notify via SMS</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCards.map((card) => {
                console.log("Render Checkbox for", card.id, "checked=", smsInputs[card.id] || false);
                return (
                  <tr key={card.id ?? card.cardNumber}>
                    <td className="py-2 px-4 border-b">{card.cardholder}</td>
                    <td className="py-2 px-4 border-b">{card.cardNumber}</td>
                    <td className="py-2 px-4 border-b">
                      {/* Amount input with tooltip on hover */}
                      <div className="flex items-center">
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <input
                                type="number"
                                min="0"
                                className={`border rounded px-2 py-1 w-24 ${!isAmountValid(card.id, card.balance) ? 'border-paycard-red ring-1 ring-paycard-red' : ''}`}
                                value={amountInputs[card.id] ?? ""}
                                onChange={(e) =>
                                  handleAmountChange(card.id, e.target.value)
                                }
                                placeholder="R 0.00"
                              />
                            </TooltipTrigger>
                            <TooltipContent>
                              <span>
                                {getTooltipMessage(card.balance)}
                              </span>
                            </TooltipContent>
                          </Tooltip>
                        </TooltipProvider>
                      </div>
                    </td>
                    <td className="py-2 px-4 border-b">{getFeeForCard(card.id)}</td>
                    <td className="py-2 px-4 border-b">
                      <div className="flex items-center justify-center h-6">
                        <Checkbox
                          checked={smsInputs[card.id] || false}
                          onCheckedChange={(checked: boolean) =>
                            handleSMSChange(card.id, checked)
                          }
                          id={`sms-checkbox-${card.id}`}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
            {/* Table Footer for totals */}
            <tfoot>
              <tr>
                <td className="py-2 px-4 border-b font-semibold" colSpan={2}>Total</td>
                <td className="py-2 px-4 border-b font-semibold">
                  R {totals.amount.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b font-semibold">
                  R {totals.fee.toFixed(2)}
                </td>
                <td className="py-2 px-4 border-b"></td>
              </tr>
            </tfoot>
          </table>
        </div>
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
              className="btn-primary"
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
