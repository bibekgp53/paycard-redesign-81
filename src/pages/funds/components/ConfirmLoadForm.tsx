
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";
import { ConfirmLoadTable } from "./ConfirmLoadTable";
import { LoadAlert, AlertType } from "./LoadAlert";
import { SelectedLoad } from "@/store/useCardLoadsStore";

interface ConfirmLoadFormProps {
  selectedLoads: SelectedLoad[];
  loading: boolean;
  alertState: AlertType;
  onConfirm: () => void;
  onBack: () => void;
  onAlertClose: () => void;
  effectiveDate: 0 | 1;
  selectedDate?: Date;
}

export const ConfirmLoadForm = ({
  selectedLoads,
  loading,
  alertState,
  onConfirm,
  onBack,
  onAlertClose,
  effectiveDate,
  selectedDate,
}: ConfirmLoadFormProps) => {
  const renderEffectiveDate = () => {
    if (effectiveDate === 1 && selectedDate) {
      return `Delay until ${format(new Date(selectedDate), "MMMM d, yyyy HH:mm:ss")}`;
    }
    return "Immediate";
  };

  return (
    <>
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Confirm Card Load</h1>
        <p className="text-gray-600 mb-4">
          Please confirm the details before loading funds to these cards:
        </p>
        {alertState && <LoadAlert alert={alertState} onClose={onAlertClose} />}
        <ConfirmLoadTable loads={selectedLoads} />
        <div className="flex justify-between mt-6">
          <Button variant="outline" onClick={onBack}>Back</Button>
          <Button 
            className="btn-primary" 
            onClick={onConfirm} 
            disabled={selectedLoads.length === 0 || loading}
          >
            {loading ? "Loading..." : "Confirm & Load"}
          </Button>
        </div>
      </Card>
      <Card className="bg-white p-4">
        <div>
          Effective Date: <strong>{renderEffectiveDate()}</strong>
        </div>
      </Card>
    </>
  );
};
