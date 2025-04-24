import React from "react";
import { useNavigate } from "react-router-dom";
import { useUserHeaderQuery } from "@/hooks/useUserHeaderQuery";
import { useLoadClientQuery } from "@/hooks/useLoadClientQuery";
import { useLoadAllocatedCards } from "@/hooks/useLoadAllocatedCards";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";
import { CardLoadsTable } from "./components/CardLoadsTable";
import { CardLoadsActionPanel } from "./components/CardLoadsActionPanel";
import { CardsPagination } from "./components/CardsPagination";
import { Loader2 } from "lucide-react";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { Card } from "@/components/ui/card";

export function CardLoads() {
  const navigate = useNavigate();
  const {
    page,
    setPage,
    selectedLoads,
    effectiveDate,
    selectedDate,
  } = useCardLoadsStore();

  const pageSize = 10;
  const { data: userHeader, isLoading: userHeaderLoading } = useUserHeaderQuery();
  const { data: clientSettings, isLoading: clientLoading } = useLoadClientQuery();
  const { data: cards, isLoading: cardsLoading } = useLoadAllocatedCards();

  const isLoading = userHeaderLoading || clientLoading || cardsLoading;
  const totalPages = cards ? Math.ceil(cards.length / pageSize) : 1;

  const handleLoadFundsClick = () => {
    navigate("/load-funds-from");
  };

  const totals = React.useMemo(() => {
    if (!cards || !clientSettings) return { amount: 0, fee: 0, smsFee: 0 };
    let totalAmount = 0;
    let totalFee = 0;
    let totalSMS = 0;
    selectedLoads.forEach((load) => {
      totalAmount += load.transferAmount;
      totalFee += load.transferFee;
      totalSMS += load.transferSMSNotificationFee;
    });
    return { amount: totalAmount, fee: totalFee, smsFee: totalSMS };
  }, [selectedLoads, cards, clientSettings]);

  const breadcrumbItems = [
    { label: "Load Funds From", path: "/load-funds-from" },
    { label: "Card Loads", isCurrentPage: true }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      
      <div className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
          <span className="block mt-2 text-sm">
            The balance available on your profile is R {clientSettings?.profile?.fromBalance?.toFixed(2) || '0.00'}
          </span>
        </p>
      </div>

      <div className="bg-white p-6">
        {isLoading ? (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 text-paycard-navy animate-spin" />
            <span className="ml-2 text-lg">Loading card data...</span>
          </div>
        ) : (
          <>
            <CardLoadsTable
              cards={cards || []}
              clientSettings={clientSettings}
              page={page}
              pageSize={pageSize}
            />
            {cards && cards.length > pageSize && (
              <CardsPagination
                currentPage={page}
                totalPages={totalPages}
                onPageChange={setPage}
              />
            )}
            <div className="pt-4 text-right font-semibold text-paycard-navy">
              Total: R {totals.amount.toFixed(2)} | Fee: R {totals.fee.toFixed(2)} | SMS Notification Fee: R {totals.smsFee.toFixed(2)}
            </div>
            <CardLoadsActionPanel
              effectiveDate={effectiveDate}
              selectedDate={selectedDate}
              clientSettings={clientSettings}
              selectedLoads={selectedLoads}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default CardLoads;
