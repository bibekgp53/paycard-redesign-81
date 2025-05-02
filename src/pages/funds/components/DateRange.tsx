
import React, { useState, useEffect } from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format, isAfter, isSameDay } from "date-fns";

// Define a type for date range to properly handle the calendar range selection
interface DateRangeType {
  from: Date | undefined;
  to: Date | undefined;
}

interface DateRangeProps {
  dateRange: DateRangeType;
  onDateRangeChange: (range: DateRangeType) => void;
}

export function DateRange({ dateRange, onDateRangeChange }: DateRangeProps) {
  // Track which date we're currently selecting (from or to)
  const [selectingTo, setSelectingTo] = useState<boolean>(false);
  // State to track the display text for the button
  const [displayText, setDisplayText] = useState<string>("Select date range");
  // State to control the open/close state of the popover
  const [open, setOpen] = useState(false);

  // Update display text whenever dateRange changes
  useEffect(() => {
    if (dateRange.from) {
      if (dateRange.to) {
        setDisplayText(`${format(dateRange.from, "PPP")} - ${format(dateRange.to, "PPP")}`);
      } else {
        setDisplayText(format(dateRange.from, "PPP"));
      }
    } else {
      setDisplayText("Select date range");
    }
    
    // Reset the selecting state when dateRange changes externally
    setSelectingTo(!!dateRange.from && !dateRange.to);
  }, [dateRange.from, dateRange.to]);

  // Handle the calendar date selection
  const handleSelect = (date: Date | undefined) => {
    if (!date) return;
    
    if (!selectingTo) {
      // First selection sets the 'from' date
      onDateRangeChange({
        from: date,
        to: undefined
      });
      setSelectingTo(true);
    } else {
      // Second selection sets the 'to' date
      // Ensure 'to' date is after or same as 'from' date
      if (dateRange.from && (isAfter(date, dateRange.from) || isSameDay(date, dateRange.from))) {
        onDateRangeChange({
          from: dateRange.from,
          to: date
        });
      } else if (dateRange.from) {
        // If user selected a date before 'from', swap them
        onDateRangeChange({
          from: date,
          to: dateRange.from
        });
      }
      setSelectingTo(false);
      // Close the popover after selecting the end date
      setOpen(false);
    }
  };

  return (
    <div className="grid gap-2">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id="date"
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal bg-paycard-navy-100/30 border-paycard-navy-200",
              !dateRange.from && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {displayText}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <div className="p-3 border-b border-border">
            <div className="text-sm font-medium">
              {!selectingTo ? (
                <span>Select start date</span>
              ) : (
                <span>Select end date</span>
              )}
            </div>
          </div>
          <Calendar
            initialFocus
            selected={selectingTo ? dateRange.from : dateRange.from}
            onSelect={handleSelect}
            defaultMonth={dateRange.from}
            numberOfMonths={2}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
