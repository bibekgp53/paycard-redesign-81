
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb } from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";
import { supabase } from "@/integrations/supabase/client";
import React, { useState } from "react";
import { useLoadClientQuery } from "@/hooks/useLoadClientQuery";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { XCircle, CheckCircle2 } from "lucide-react";
import { InvoiceDisplay } from "./components/InvoiceDisplay";

type AlertType = null | { type: "success" | "error", message: string };

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

  // Cached invoice data for rendering after success
  const [invoiceMeta, setInvoiceMeta] = useState<any>(null);

  // Format date+time for display
  const renderEffectiveDate = () => {
    if (effectiveDate === 1 && selectedDate) {
      return `Delay until ${format(new Date(selectedDate), "MMMM d, yyyy HH:mm:ss")}`;
    }
    return "Immediate";
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

    const transferUuid = clientSettings.transferUUID;
    let dateForPayload: Date = new Date();
    if (effectiveDate === 1 && selectedDate) dateForPayload = new Date(selectedDate);

    function pad2(n: number) {
      return n.toString().padStart(2, "0");
    }
    function formatDT(d: Date) {
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

    const payload = {
      accountFrom: false,
      transferUuid,
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
      
      const { data, error } = await supabase.from("load_funds").insert([
        {
          account_from: payload.accountFrom,
          transfer_uuid: payload.transferUuid,
          process_delay: payload.processDelay,
          start_date: payload.startDate,
          end_date: payload.endDate,
          cards_to_load: payload.cardsToLoad,
          transfer_from_account_id: payload.transferFromAccountId,
          process_type: payload.processType,
          cards: payload.cards,
        }
      ]).select();
      
      if (error) {
        console.error("Error inserting data:", error);
        setAlertState({
          type: "error",
          message: "Failed to save load request: " + error.message,
        });
        setLoading(false);
        return;
      }

      console.log("Load funds insert success:", data);
      
      // Set success alert
      setAlertState({
        type: "success",
        message: "Funds loaded successfully",
      });
      
      // Switch to invoice screen
      setInvoiceMeta({
        invoiceNumber: Math.floor(Math.random() * 90000000 + 10000000).toString(),
        invoiceDate: format(new Date(), "yyyy/MM/dd"),
        referenceNumber: "0579245614", // Example static for now
        vatReg: "687", // Example static
        company: "Thami's Gmbh Ltd",
        companyNumbers: ["78687678213", "jghguy", "gyug", "8757656", "7898"],
        cards: selectedLoads.map(l => ({
          cardNumber: l.cardNumber, // Masking already handled
          transferAmount: l.transferAmount,
          transferFee: l.transferFee,
        })),
        vatRate: 0.15,
      });
      
      resetCardLoadsState();
      setShowInvoice(true);
    } catch (e) {
      console.error("Unexpected error:", e);
      setAlertState({
        type: "error",
        message: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // Back should not set state, just navigate back to card loads
  const handleBack = () => {
    navigate("/load-funds-from/card-loads");
  };

  // If finished, show invoice
  if (showInvoice && invoiceMeta) {
    return <InvoiceDisplay {...invoiceMeta} />;
  }

  const breadcrumbItems = [
    { label: "Load Funds From", path: "/load-funds-from" },
    { label: "Card Loads", path: "/load-funds-from/card-loads" },
    { label: "Confirm Load", isCurrentPage: true }
  ];

  return (
    <div className="space-y-6">
      <Breadcrumb items={breadcrumbItems} />

      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Confirm Card Load</h1>
        <p className="text-gray-600 mb-4">
          Please confirm the details before loading funds to these cards:
        </p>
        {alertState && (
          <Alert
            variant={alertState.type === "error" ? "destructive" : "default"}
            className={`mb-4 ${
              alertState.type === "error"
                ? "bg-pcard-status-red-light border-pcard-status-red text-pcard-status-red"
                : "bg-pcard-status-green-light border-pcard-status-green text-pcard-status-green"
            }`}
          >
            {alertState.type === "error" ? (
              <XCircle className="w-5 h-5 text-pcard-status-red mr-2" />
            ) : (
              <CheckCircle2 className="w-5 h-5 text-pcard-status-green mr-2" />
            )}
            <div>
              <AlertTitle>
                {alertState.type === "error" ? "Error" : "Success"}
              </AlertTitle>
              <AlertDescription>
                {alertState.message}
              </AlertDescription>
            </div>
            <button
              className="ml-auto text-gray-400 hover:text-gray-700 flex items-center"
              onClick={() => setAlertState(null)}
              aria-label="Close"
              type="button"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </Alert>
        )}

        {selectedLoads.length === 0 ? (
          <div className="text-sm text-paycard-red">No cards selected for load.</div>
        ) : (
          <table className="w-full text-left border mt-2 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">NAME</th>
                <th className="py-2 px-4 border-b">CARD NUMBER</th>
                <th className="py-2 px-4 border-b">AMOUNT</th>
                <th className="py-2 px-4 border-b">FEE</th>
                <th className="py-2 px-4 border-b">SMS NOTIFICATION FEE</th>
              </tr>
            </thead>
            <tbody>
              {selectedLoads.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{item.cardholderName}</td>
                  <td className="py-2 px-4 border-b">{item.cardNumber}</td>
                  <td className="py-2 px-4 border-b">R {item.transferAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">R {item.transferFee.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">R {item.transferSMSNotificationFee.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>Back</Button>
          <Button className="btn-primary" onClick={handleConfirmAndLoad} disabled={selectedLoads.length === 0 || loading}>
            {loading ? "Loading..." : "Confirm & Load"}
          </Button>
        </div>
      </Card>
      <Card className="bg-white p-4">
        <div>
          Effective Date: <strong>{renderEffectiveDate()}</strong>
        </div>
      </Card>
    </div>
  );
}
