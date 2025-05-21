
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface DateRangeProps {
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  disabled?: boolean;
  disableFutureDates?: boolean;
}

export interface DateRange {
  from: Date | undefined;
  to?: Date | undefined;
}

export function DateRange({
  dateRange,
  onDateRangeChange,
  disabled = false,
  disableFutureDates = false,
}: DateRangeProps) {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const handleCalendarSelect = (range: DateRange | undefined) => {
    if (!range) return;
    onDateRangeChange(range);
    
    // Close calendar if a range is selected
    if (range.from && range.to) {
      setIsCalendarOpen(false);
    }
  };

  const toggleCalendar = () => {
    if (!disabled) {
      setIsCalendarOpen(!isCalendarOpen);
    }
  };

  // Create a function to check if a date is in the future
  const isDateDisabled = (date: Date) => {
    if (!disableFutureDates) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date > today;
  };

  return (
    <div className="w-full">
      <div className="relative">
        <Button
          type="button"
          variant="outline"
          onClick={toggleCalendar}
          disabled={disabled}
          className={cn(
            "w-full justify-start text-left font-normal border-paycard-navy-200 bg-white",
            !dateRange && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        >
          {dateRange.from ? (
            dateRange.to ? (
              <span>
                {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
              </span>
            ) : (
              <span>{format(dateRange.from, "PPP")}</span>
            )
          ) : (
            <span>Select a date range</span>
          )}
          <ChevronRight className="ml-auto h-4 w-4 opacity-50 rotate-90" />
        </Button>
        
        {isCalendarOpen && (
          <div className="absolute z-50 mt-2 rounded-md border border-paycard-navy-200 bg-white p-3 shadow-md">
            <Calendar
              mode="range"
              defaultMonth={dateRange.from}
              selected={dateRange}
              onSelect={handleCalendarSelect}
              numberOfMonths={2}
              disabled={isDateDisabled}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default DateRange;
