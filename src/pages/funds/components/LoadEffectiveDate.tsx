
import React, { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { CalendarTimeSection } from "@/components/ui/calendar-time-section";
import { format } from "date-fns";

interface LoadEffectiveDateProps {
  selectedDate: Date | undefined;
  onSelectedDateChange: (date: Date) => void;
  disabled?: boolean;
  disablePastDates?: boolean;
}

export const LoadEffectiveDate = ({
  selectedDate,
  onSelectedDateChange,
  disabled = false,
  disablePastDates = true,
}: LoadEffectiveDateProps) => {
  const [calendarOpen, setCalendarOpen] = useState(false);

  // Create functions to handle calendar state
  const toggleCalendar = () => {
    if (!disabled) {
      setCalendarOpen(!calendarOpen);
    }
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    
    // Preserve time component from the previously selected date if it exists
    if (selectedDate) {
      date.setHours(selectedDate.getHours());
      date.setMinutes(selectedDate.getMinutes());
      date.setSeconds(selectedDate.getSeconds());
    } else {
      // Set default time to 12:00 PM
      date.setHours(12);
      date.setMinutes(0);
      date.setSeconds(0);
    }
    onSelectedDateChange(date);
  };

  const handleTimeChange = (date: Date, opts?: { fromTimeInput?: boolean }) => {
    onSelectedDateChange(date);
    // Don't close the calendar when time is updated via the time inputs
    if (!opts?.fromTimeInput) {
      setCalendarOpen(false);
    }
  };

  // Create a function to check if a date is in the past
  const isDateInPast = (date: Date) => {
    if (!disablePastDates) return false;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  return (
    <div className="w-full">
      <div className="mb-2">
        <p className="text-sm font-medium text-paycard-navy">Effective Date</p>
      </div>
      <div className="relative">
        <Button
          variant="outline"
          className={cn(
            "w-full justify-between text-left font-normal border-paycard-navy-200",
            !selectedDate && "text-muted-foreground",
            disabled && "opacity-50 cursor-not-allowed"
          )}
          onClick={toggleCalendar}
          disabled={disabled}
        >
          <div>
            {selectedDate ? (
              <div className="flex flex-col">
                <span className="text-paycard-navy">
                  {format(selectedDate, "EEEE dd MMMM yyyy")}
                </span>
                <span className="text-paycard-navy-400 text-xs">
                  {format(selectedDate, "h:mm a")}
                </span>
              </div>
            ) : (
              <span>Select date and time</span>
            )}
          </div>
          <ChevronRight className="h-4 w-4 opacity-50 rotate-90" />
        </Button>
        {calendarOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-paycard-navy-200 rounded-md shadow-lg p-3 w-full sm:w-auto">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={isDateInPast}
              initialFocus
            />
            <CalendarTimeSection
              showTimeInput
              selected={selectedDate || undefined}
              onSelect={handleTimeChange}
              timeLabel="Time"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default LoadEffectiveDate;
