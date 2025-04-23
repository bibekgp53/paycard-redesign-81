
// Just separates out effective date + continue button logic
import { Button } from "@/components/ui/button";
import { LoadEffectiveDate } from "./LoadEffectiveDate";
import { useCardLoadsStore } from "@/store/useCardLoadsStore";
import { useNavigate } from "react-router-dom";
import { ClientSettings } from "@/graphql/types";
import React from "react";

interface CardLoadsActionPanelProps {
  effectiveDate: 0 | 1;
  selectedDate: Date | undefined;
  clientSettings: ClientSettings | undefined;
  selectedLoads: any[];
}

export function CardLoadsActionPanel({
  effectiveDate,
  selectedDate,
  clientSettings,
  selectedLoads,
}: CardLoadsActionPanelProps) {
  const navigate = useNavigate();
  const { setEffectiveDate, setSelectedDate } = useCardLoadsStore();

  const handleContinue = () => {
    if (!clientSettings) return;
    if (!selectedLoads.length) {
      // Optionally, display a toast error here
      return;
    }
    navigate("/load-funds-from/card-loads/confirm-load");
  };

  return (
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
          variant="default"
          size="default"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
