
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Label } from "@/components/ui/label";
import { CalendarIcon, Clock } from "lucide-react";
import { format } from "date-fns";

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

// NEW: 24-hour format for button & below display
function formatDateTime24(date?: Date) {
  if (!date) return "";
  // Pad for 2-digits
  const pad = (v: number) => v.toString().padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth()+1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
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
                    {/* Display date and time in the requested format */}
                    {formatDateTime24(selectedDate)}
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
            {/* Display selected value in yyyy-MM-dd HH:mm:ss under the button */}
          </Popover>
          {selectedDate && (
            <div className="mt-2 text-paycard-navy-700 border border-red-300 bg-red-50 rounded px-2 py-1 w-full flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              <span>{formatDateTime24(selectedDate)}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

