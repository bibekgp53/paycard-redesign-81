import { useLocation, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { format } from "date-fns";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";

export default function ConfirmLoad() {
  const location = useLocation();
  const navigate = useNavigate();
  // Instead of using location.state, get working state from Zustand
  const {
    amountInputs,
    smsInputs,
    effectiveDate,
    selectedDate,
    page,
    setAmountInputs,
    setSmsInputs,
    setEffectiveDate,
    setSelectedDate,
    setPage,
  } = useCardLoadsStore();

  // Support the ability to grab cards array from navigation if coming fresh
  const navState = (location.state ?? {}) as {
    cards?: Array<{
      accountCardId: number;
      transferAmount: number;
      transferFeeAmount: number;
      transferSMSNotificationFee: number;
      cardholder: string;
      cardNumber: string;
      notifyViaSMS?: boolean;
    }>;
  };

  // If navigating direct from CardLoads, navState.cards won't exist, 
  // but amounts, smsInputs etc. are always global in store
  // If coming fresh (reload), cards will be undefined.

  const cards = navState.cards ?? [];

  // Back should not set state, just navigate back to card loads
  const handleBack = () => {
    // Just go back to CardLoads (store is always up to date now)
    navigate("/load-funds-from/card-loads");
  };

  // Format date+time for display
  const renderEffectiveDate = () => {
    if (effectiveDate === 1 && selectedDate) {
      return `Delay until ${format(new Date(selectedDate), "MMMM d, yyyy HH:mm:ss")}`;
    }
    return "Immediate";
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
        {cards.length === 0 ? (
          <div className="text-sm text-paycard-red">No cards selected for load.</div>
        ) : (
          <table className="w-full text-left border mt-2 mb-4">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">CARDHOLDER</th>
                <th className="py-2 px-4 border-b">CARD NUMBER</th>
                <th className="py-2 px-4 border-b">AMOUNT</th>
                <th className="py-2 px-4 border-b">FEE</th>
                <th className="py-2 px-4 border-b">SMS NOTIFICATION FEE</th>
              </tr>
            </thead>
            <tbody>
              {cards.map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2 px-4 border-b">{item.cardholder}</td>
                  <td className="py-2 px-4 border-b">{item.cardNumber}</td>
                  <td className="py-2 px-4 border-b">R {item.transferAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">R {item.transferFeeAmount.toFixed(2)}</td>
                  <td className="py-2 px-4 border-b">
                    {item.notifyViaSMS
                      ? `R ${item.transferSMSNotificationFee ? item.transferSMSNotificationFee.toFixed(2) : "0.00"}`
                      : "R 0.00"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={handleBack}>Back</Button>
          <Button className="btn-primary">Confirm & Load</Button>
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
