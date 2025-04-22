import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker, SelectSingleEventHandler } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// Only support single mode for Calendar!
export type CalendarProps = Omit<
  React.ComponentProps<typeof DayPicker>,
  "mode" | "selected" | "onSelect"
> & {
  showTimeInput?: boolean;
  timeLabel?: React.ReactNode;
  selected: Date | undefined;
  onSelect: (date: Date | undefined, opts?: { fromTimeInput?: boolean }) => void;
};

function getTimeString12(date?: Date) {
  // Returns HH:MM (12-hour), and AM/PM
  if (!date) return { time: "", period: "AM" };
  let hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const period = hours >= 12 ? "PM" : "AM";
  let adjHours = hours % 12;
  if (adjHours === 0) adjHours = 12;
  const time = [
    adjHours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
  return { time, period };
}

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  showTimeInput = false,
  timeLabel = "Time",
  selected,
  onSelect,
  ...props
}: CalendarProps) {
  // Select date from calendar grid
  const handleDaySelect: SelectSingleEventHandler = (date) => {
    onSelect(date, { fromTimeInput: false }); // Close popover on calendar pick
  };

  // Local state for AM/PM (update when date/time changes)
  const { time: inputTime, period } = getTimeString12(selected);

  // Handle time input as HH:MM:SS string and AM/PM
  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement> | "period",
    value?: string
  ) => {
    if (!selected) return;
    let h = selected.getHours();
    let m = selected.getMinutes();
    let s = selected.getSeconds();
    let ampm = period;

    if (typeof e === "string" && value) {
      // AM/PM select changed
      ampm = value;
    } else {
      // HH:MM:SS input changed
      const parts = (e.target.value || "12:00:00").split(":").map((v) => parseInt(v, 10) || 0);
      h = parts[0];
      m = parts[1];
      s = parts[2];
    }

    // Convert to 24-hour format
    let hours24 = h;
    if (ampm === "PM" && h !== 12) hours24 += 12;
    if (ampm === "AM" && h === 12) hours24 = 0;

    const updated = new Date(selected.getTime());
    updated.setHours(hours24, m, s, 0);
    // Don't close popover on time input
    onSelect(updated, { fromTimeInput: true });
  };

  // Ensure if calendar is used, popover closes; if time input/AMPM, popover stays.

  return (
    <div>
      <DayPicker
        mode="single"
        showOutsideDays={showOutsideDays}
        className={cn("p-3 pointer-events-auto", className)}
        classNames={{
          months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "flex justify-center pt-1 relative items-center",
          caption_label: "text-sm font-medium",
          nav: "space-x-1 flex items-center",
          nav_button: cn(
            buttonVariants({ variant: "outline" }),
            "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
          ),
          nav_button_previous: "absolute left-1",
          nav_button_next: "absolute right-1",
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell: "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected].day-range-end)]:rounded-r-md [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20",
          day: cn(
            buttonVariants({ variant: "ghost" }),
            "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
          ),
          day_range_end: "day-range-end",
          day_selected:
            "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle: "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        }}
        selected={selected}
        onSelect={handleDaySelect}
        {...props}
      />
      {showTimeInput && selected && (
        <div
          className="flex flex-row items-center gap-2 mt-3 mb-2 border border-paycard-navy-200 rounded-md px-2 py-2 bg-white w-[95%] mx-auto"
          style={{ minWidth: 180, maxWidth: 250 }}
        >
          <label htmlFor="delay-time" className="text-xs font-medium text-paycard-navy mr-2 min-w-[48px] text-left">
            {timeLabel}
          </label>
          <input
            id="delay-time"
            type="text"
            pattern="^(0?[1-9]|1[0-2]):[0-5][0-9](:[0-5][0-9])?$"
            className="border border-paycard-navy-200 rounded px-2 py-1 bg-white w-[80px] text-left font-mono"
            value={inputTime}
            onChange={handleTimeChange}
            autoComplete="off"
          />
          <select
            aria-label="AM/PM"
            className="border border-paycard-navy-200 rounded px-2 py-1 bg-white"
            value={period}
            onChange={(e) => handleTimeChange("period", e.target.value)}
          >
            <option>AM</option>
            <option>PM</option>
          </select>
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
