
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";
import { useLoadClientQuery } from "@/hooks/useLoadClientQuery";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { InvoiceDisplay } from "./components/InvoiceDisplay";
import { ConfirmLoadForm } from "./components/ConfirmLoadForm";
import { AlertType } from "./components/LoadAlert";
import { format } from "date-fns";
import { useSelectedCardsStore } from "@/store/useSelectedCardsStore";

export default function ConfirmLoad() {
  const navigate = useNavigate();
  const {
    effectiveDate,
    selectedDate,
    selectedLoads,
    resetCardLoadsState
  } = useCardLoadsStore();
  const { data: clientSettings } = useLoadClientQuery();
  const [loading, setLoading] = useState(false);
  const [alertState, setAlertState] = useState<AlertType>(null);
  const [showInvoice, setShowInvoice] = useState(false);
  const [invoiceMeta, setInvoiceMeta] = useState<any>(null);
  
  const { isFromSearch } = useSelectedCardsStore();
  
  const handleBack = () => {
    navigate("/load-funds-from/card-loads");
  };

  const handleConfirmAndLoad = async () => {
    if (!clientSettings || !selectedLoads.length) {
      setAlertState({
        type: "error",
        message: "No cards selected or client settings missing.",
      });
      return;
    }

    setLoading(true);
    setAlertState(null);

    function formatDT(d: Date) {
      const pad2 = (n: number) => n.toString().padStart(2, "0");
      return (
        d.getFullYear() +
        "-" +
        pad2(d.getMonth() + 1) +
        "-" +
        pad2(d.getDate()) +
        " " +
        pad2(d.getHours()) +
        ":" +
        pad2(d.getMinutes()) +
        ":" +
        pad2(d.getSeconds())
      );
    }

    let dateForPayload: Date = new Date();
    if (effectiveDate === 1 && selectedDate) dateForPayload = new Date(selectedDate);

    const payload = {
      accountFrom: false,
      transferUuid: clientSettings.transferUUID,
      processDelay: effectiveDate,
      startDate: formatDT(dateForPayload),
      endDate: formatDT(dateForPayload),
      cardsToLoad: selectedLoads.map((l) => l.accountCardId),
      transferFromAccountId: 0,
      processType: 0,
      cards: selectedLoads.map(l => ({
        accountCardId: l.accountCardId,
        transferAmount: l.transferAmount,
        transferFee: l.transferFee,
        transferSMSNotificationFee: l.transferSMSNotificationFee,
        transferSMSNotification: l.transferSMSNotification ? 1 : 0,
      }))
    };

    try {
      console.log("Sending payload to Supabase:", payload);
      
      const { data, error } = await supabase.from("load_funds").insert([{
        account_from: payload.accountFrom,
        transfer_uuid: payload.transferUuid,
        process_delay: payload.processDelay,
        start_date: payload.startDate,
        end_date: payload.endDate,
        cards_to_load: payload.cardsToLoad,
        transfer_from_account_id: payload.transferFromAccountId,
        process_type: payload.processType,
        cards: payload.cards,
      }]).select();
      
      if (error) throw error;

      console.log("Load funds insert success:", data);
      
      setAlertState({
        type: "success",
        message: "Funds loaded successfully",
      });
      
      setInvoiceMeta({
        invoiceNumber: Math.floor(Math.random() * 90000000 + 10000000).toString(),
        invoiceDate: format(new Date(), "yyyy/MM/dd"),
        referenceNumber: "0579245614",
        vatReg: "687",
        company: "Thami's Gmbh Ltd",
        companyNumbers: ["78687678213", "jghguy", "gyug", "8757656", "7898"],
        cards: selectedLoads.map(l => ({
          cardNumber: l.cardNumber,
          transferAmount: l.transferAmount,
          transferFee: l.transferFee,
        })),
        vatRate: 0.15,
      });
      
      resetCardLoadsState();
      setShowInvoice(true);
    } catch (e) {
      console.error("Error:", e);
      setAlertState({
        type: "error",
        message: e instanceof Error ? e.message : "An unexpected error occurred",
      });
    } finally {
      setLoading(false);
    }
  };

  if (showInvoice && invoiceMeta) {
    return <InvoiceDisplay {...invoiceMeta} />;
  }

  const breadcrumbItems = [
    { label: "Load Funds From", path: "/load-funds-from" },
    { label: "To", path: "/load-funds-from/to" },
    { label: isFromSearch ? "Search Card" : "To", path: isFromSearch ? "/load-funds-from/to/search-card" : "/load-funds-from/to" },
    { label: "Card Loads", path: "/load-funds-from/card-loads" },
    { label: "Confirm Load", isCurrentPage: true }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />
      <ConfirmLoadForm
        selectedLoads={selectedLoads}
        loading={loading}
        alertState={alertState}
        onConfirm={handleConfirmAndLoad}
        onBack={handleBack}
        onAlertClose={() => setAlertState(null)}
        effectiveDate={effectiveDate}
        selectedDate={selectedDate}
      />
    </div>
  );
}
