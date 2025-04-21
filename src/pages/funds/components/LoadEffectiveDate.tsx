
import React, { useRef } from "react";
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
  const popoverRef = useRef<{close: () => void} | null>(null);

  // Utility to get time value as "HH:mm:ss" string from a Date, or fallback to default.
  const getTimeString = (date?: Date) => {
    if (!date) return "00:00:00";
    return [
      date.getHours().toString().padStart(2, "0"),
      date.getMinutes().toString().padStart(2, "0"),
      date.getSeconds().toString().padStart(2, "0"),
    ].join(":");
  };

  // Date change handler
  const handleDateChange = (date: Date | undefined) => {
    if (!date) {
      onSelectedDateChange(undefined);
      return;
    }
    // Preserve previous time if selecting with time input; default to 00:00:00
    let [h, m, s] = selectedDate
      ? [selectedDate.getHours(), selectedDate.getMinutes(), selectedDate.getSeconds()]
      : [0, 0, 0];
    const updated = new Date(date);
    updated.setHours(h, m, s, 0);
    onSelectedDateChange(updated);
    // Close popover after date is picked
    if (popoverRef.current) {
      popoverRef.current.close();
    }
  };

  // Time input change handler (value: "HH:mm:ss")
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || "00:00:00";
    const [h, m, s] = value.split(":").map((v) => parseInt(v, 10) || 0);
    if (selectedDate) {
      const updated = new Date(selectedDate);
      updated.setHours(h, m, s, 0);
      onSelectedDateChange(updated);
    }
  };

  // Effective date mode change (immediate/delay)
  const handleRadioChange = (value: "immediate" | "delay") => {
    onEffectiveDateChange(value);
    // Optionally reset time? For now, leaving previous as is.
  };

  // Custom popover with ref to allow closing programmatically
  const PopoverWithRef = React.forwardRef<any, React.ComponentProps<typeof Popover>>(({children, ...props}, ref) => {
    // Expose close method
    const popoverContentRef = React.useRef<any>(null);
    React.useImperativeHandle(ref, () => ({
      close: () => {
        if (popoverContentRef.current) popoverContentRef.current.setOpen(false);
      },
    }));
    return (
      <Popover {...props} ref={popoverContentRef}>{children}</Popover>
    );
  });

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
          <PopoverWithRef ref={popoverRef}>
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
                {/* Time input (HH:mm:ss format) */}
                <div className="flex items-center gap-2 mt-3 justify-center mb-2">
                  <Label htmlFor="delay-time" className="text-xs">Time</Label>
                  <input
                    id="delay-time"
                    type="time"
                    step="1"
                    className="border rounded px-2 py-1 bg-white"
                    style={{marginBottom: 8}}
                    value={getTimeString(selectedDate)}
                    onChange={handleTimeChange}
                  />
                </div>
              </div>
            </PopoverContent>
          </PopoverWithRef>
        </div>
      )}
    </div>
  );
};

