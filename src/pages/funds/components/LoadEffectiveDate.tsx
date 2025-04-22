
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

interface LoadEffectiveDateProps {
  effectiveDate: "immediate" | "delay";
  selectedDate: Date | undefined;
  onEffectiveDateChange: (value: "immediate" | "delay") => void;
  onSelectedDateChange: (date: Date | undefined) => void;
}

// Utility to format time in 12-hour with AM/PM
function formatTime12(date?: Date) {
  if (!date) return "";
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const period = hours >= 12 ? "PM" : "AM";
  let adjHours = hours % 12;
  if (adjHours === 0) adjHours = 12;
  return `${adjHours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")} ${period}`;
}

export const LoadEffectiveDate = ({
  effectiveDate,
  selectedDate,
  onEffectiveDateChange,
  onSelectedDateChange,
}: LoadEffectiveDateProps) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  // Accept an optional flag to decide if selection came from time input
  const handleDateChange = (date: Date | undefined, fromTimeInput?: boolean) => {
    onSelectedDateChange(date);
    // Only close popover if triggered from DayPicker, not time input
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
                    {format(selectedDate, "MMMM d, yyyy")},{" "}
                    <span className="ml-1">{formatTime12(selectedDate)}</span>
                  </>
                ) : (
                  <span>Pick a date</span>
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
                timeLabel="Time"
                disabled={(date) => date < new Date()}
              />
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
