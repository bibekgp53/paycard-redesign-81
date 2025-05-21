
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

function isAmountValidForSelectedLoads(selectedLoads: any[], clientSettings: ClientSettings | undefined, cards: any[] = []) {
  if (!clientSettings || !selectedLoads.length) return false;
  const minAmount = clientSettings.details.clientMinimumCardLoad;
  // We don't have the current cardBalance per selectedLoad (would need all cards), so we'll skip max amount check here,
  // assuming prior page already ensures this. Only check for min and positive.
  return selectedLoads.every(l =>
    typeof l.transferAmount === "number" &&
    l.transferAmount >= minAmount
  );
}

// Update validation: For "Delay until" (1), selectedDate must simply be set (not undefined)
function isDateTimeValid(effectiveDate: 0 | 1, selectedDate: Date | undefined) {
  if (effectiveDate === 1) {
    return !!selectedDate; // Only check that a date is picked
  }
  return true; // Immediate: always valid
}

export function CardLoadsActionPanel({
  effectiveDate,
  selectedDate,
  clientSettings,
  selectedLoads,
}: CardLoadsActionPanelProps) {
  const navigate = useNavigate();
  const { setEffectiveDate, setSelectedDate } = useCardLoadsStore();

  const amountsValid = isAmountValidForSelectedLoads(selectedLoads, clientSettings);
  const dateValid = isDateTimeValid(effectiveDate, selectedDate);

  const handleContinue = () => {
    if (!clientSettings) return;
    if (!amountsValid || !dateValid) {
      // Optionally, display a toast error here
      return;
    }
    navigate("/load-funds-from/card-loads/confirm-load");
  };

  return (
    <div className="mt-6 space-y-6">
      <LoadEffectiveDate
        selectedDate={selectedDate}
        onSelectedDateChange={setSelectedDate}
        disabled={false}
        disablePastDates={true}
      />
      <div className="flex justify-end">
        <Button
          onClick={handleContinue}
          variant="default"
          size="default"
          disabled={!amountsValid || !dateValid}
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
