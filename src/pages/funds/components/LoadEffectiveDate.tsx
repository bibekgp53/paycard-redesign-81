
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";

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
  // Local states for time selection (used only for the delay mode)
  const [localHour, setLocalHour] = useState(
    selectedDate ? selectedDate.getHours() : 0
  );
  const [localMinute, setLocalMinute] = useState(
    selectedDate ? selectedDate.getMinutes() : 0
  );

  // Updates selected date+time together
  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onSelectedDateChange(undefined);
      return;
    }
    const updated = new Date(date);
    updated.setHours(localHour);
    updated.setMinutes(localMinute);
    updated.setSeconds(0);
    updated.setMilliseconds(0);
    onSelectedDateChange(updated);
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLSelectElement>, which: "hour" | "minute") => {
    const value = parseInt(e.target.value, 10);
    const hour = which === "hour" ? value : localHour;
    const minute = which === "minute" ? value : localMinute;
    setLocalHour(hour);
    setLocalMinute(minute);

    // Update selectedDate if date is already selected
    if (selectedDate) {
      const updated = new Date(selectedDate);
      updated.setHours(hour);
      updated.setMinutes(minute);
      updated.setSeconds(0);
      updated.setMilliseconds(0);
      onSelectedDateChange(updated);
    }
  };

  // If mode switches to immediate: reset time selection
  const handleRadioChange = (value: "immediate" | "delay") => {
    onEffectiveDateChange(value);
    if (value === "immediate") {
      // Optionally reset local time, or leave as is for future
    }
  };

  // Sync local time with selectedDate when changed externally
  // This ensures UX stability on edit
  React.useEffect(() => {
    if (selectedDate) {
      setLocalHour(selectedDate.getHours());
      setLocalMinute(selectedDate.getMinutes());
    }
  }, [selectedDate]);

  return (
    <div className="space-y-2">
      <h3 className="text-sm font-medium">
        {effectiveDate === "delay" ? "Delay until" : "Load Effective Date"}
      </h3>
      <RadioGroup 
        value={effectiveDate} 
        onValueChange={(value) => handleRadioChange(value as "immediate" | "delay")}
        className="flex space-x-4"
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="immediate" id="immediately" />
          <Label htmlFor="immediately">Immediately</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="delay" id="delay" />
          <Label htmlFor="delay">Delay until</Label>
        </div>
      </RadioGroup>
      {effectiveDate === "delay" && (
        <div className="mt-2 w-[260px]">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant={"outline"} className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4" />
                {selectedDate ? format(selectedDate, "MMMM d, yyyy") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleDateChange}
                  initialFocus
                  className="p-3 pointer-events-auto"
                  disabled={(date) => date < new Date()}
                />
                {/* Time Picker INSIDE calendar popover */}
                <div className="flex items-center gap-2 mt-3 justify-center">
                  <Label htmlFor="delay-hour" className="text-xs">Hour</Label>
                  <select
                    id="delay-hour"
                    className="border rounded px-1 py-1 bg-white"
                    value={localHour}
                    onChange={(e) => handleTimeChange(e, "hour")}
                  >
                    {Array.from({ length: 24 }).map((_, h) => (
                      <option key={h} value={h}>{h.toString().padStart(2, "0")}</option>
                    ))}
                  </select>
                  <span>:</span>
                  <Label htmlFor="delay-minute" className="text-xs">Minute</Label>
                  <select
                    id="delay-minute"
                    className="border rounded px-1 py-1 bg-white"
                    value={localMinute}
                    onChange={(e) => handleTimeChange(e, "minute")}
                  >
                    {Array.from({ length: 60 }).map((_, m) => (
                      <option key={m} value={m}>{m.toString().padStart(2, "0")}</option>
                    ))}
                  </select>
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>
      )}
    </div>
  );
};
