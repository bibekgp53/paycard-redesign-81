import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

// Format function: date only = dd-MMM-yyyy; datetime = dd-MMM-yyyy HH:mm:ss
function formatDateCustom(date?: Date) {
  if (!date) return "";
  return format(date, "dd-MMM-yyyy");
}
function formatDateTimeCustom(date?: Date) {
  if (!date) return "";
  return format(date, "dd-MMM-yyyy HH:mm:ss");
}

interface LoadEffectiveDateProps {
  effectiveDate: "immediate" | "delay";
  selectedDate: Date | undefined;
  onEffectiveDateChange: (value: "immediate" | "delay") => void;
  onSelectedDateChange: (date: Date | undefined) => void;
}

export const LoadEffectiveDate = ({
  effectiveDate,
  selectedDate,
  onEffectiveDateChange,
  onSelectedDateChange,
}: LoadEffectiveDateProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  const handleDateChange = (date: Date | undefined, fromTimeInput?: boolean) => {
    onSelectedDateChange(date);
    if (!fromTimeInput) {
      setIsPopoverOpen(false);
    }
  };

  const handleRadioChange = (value: "immediate" | "delay") => {
    onEffectiveDateChange(value);
  };

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">
        {effectiveDate === "delay" ? "Delay until" : "Load Effective Date"}
      </h3>
      <div className="flex space-x-4">
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="immediately"
            name="effective-date"
            value="immediate"
            checked={effectiveDate === "immediate"}
            onChange={() => handleRadioChange("immediate")}
            className="h-4 w-4 text-paycard-navy border-paycard-navy-300 focus:ring-paycard-navy-500"
          />
          <Label htmlFor="immediately">Immediately</Label>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="radio"
            id="delay"
            name="effective-date"
            value="delay"
            checked={effectiveDate === "delay"}
            onChange={() => handleRadioChange("delay")}
            className="h-4 w-4 text-paycard-navy border-paycard-navy-300 focus:ring-paycard-navy-500"
          />
          <Label htmlFor="delay">Delay until</Label>
        </div>
      </div>

      {effectiveDate === "delay" && (
        <div className="mt-2 w-[260px]">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? (
                  <>
                    {formatDateTimeCustom(selectedDate)}
                  </>
                ) : (
                  <span>Pick a date and time</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                selected={selectedDate}
                onSelect={(date: Date | undefined, opts?: { fromTimeInput?: boolean }) =>
                  handleDateChange(date, opts?.fromTimeInput)
                }
                initialFocus
                className="p-3 pointer-events-auto"
                showTimeInput={true}
                timeLabel={
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" /> Time
                  </div>
                }
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
