
import React from "react";
import { 
  Popover,
  PopoverContent,
  PopoverTrigger 
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

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
  return (
    <div className="grid gap-2">
      <Popover>
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
            {dateRange.from ? (
              dateRange.to ? (
                <>
                  {format(dateRange.from, "PPP")} - {format(dateRange.to, "PPP")}
                </>
              ) : (
                format(dateRange.from, "PPP")
              )
            ) : (
              <span>Select date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={dateRange.from}
            // The type issue is here - we need to properly type the Calendar props
            selected={{
              from: dateRange.from,
              to: dateRange.to
            } as any}
            onSelect={(range: any) => {
              // Handle the range selection
              if (range) {
                onDateRangeChange({
                  from: range.from,
                  to: range.to
                });
              } else {
                onDateRangeChange({
                  from: undefined,
                  to: undefined
                });
              }
            }}
            numberOfMonths={2}
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
