
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import React, { useState } from "react";
import { useLoadClientQuery } from "@/hooks/useLoadClientQuery";

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

  // Format date+time for display
  const renderEffectiveDate = () => {
    if (effectiveDate === 1 && selectedDate) {
      return `Delay until ${format(new Date(selectedDate), "MMMM d, yyyy HH:mm:ss")}`;
    }
    return "Immediate";
  };

  // Supabase insert handler
  const handleConfirmAndLoad = async () => {
    if (!clientSettings || !selectedLoads.length) {
      toast.error("No cards selected or client settings missing.");
      return;
    }

    setLoading(true);

    const transferUuid = clientSettings.transferUUID;
    let dateForPayload: Date = new Date();
    if (effectiveDate === 1 && selectedDate) dateForPayload = new Date(selectedDate);

    function pad2(n: number) {
      return n.toString().padStart(2, "0");
    }
    // Format datetime as YYYY-MM-DD HH:mm:ss for startDate/endDate
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

    const { error } = await supabase.from("load_funds").insert([
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
    ]);
    setLoading(false);
    if (error) {
      toast.error("Failed to save load request: " + error.message);
      return;
    }
    toast.success("Funds load request submitted successfully!");
    resetCardLoadsState();
    navigate("/dashboard");
  };

  // Back should not set state, just navigate back to card loads
  const handleBack = () => {
    navigate("/load-funds-from/card-loads");
  };

  return (
    <div className="space-y-6">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/load-funds-from")}>Load Funds From</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink onClick={() => navigate("/load-funds-from/card-loads")}>Card Loads</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Confirm Load</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Confirm Card Load</h1>
        <p className="text-gray-600 mb-4">
          Please confirm the details before loading funds to these cards:
        </p>
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
