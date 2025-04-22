import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { DayPicker } from "react-day-picker";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

// NEW PROP: showTimeInput, onTimeChange, timeLabel
export type CalendarProps = React.ComponentProps<typeof DayPicker> & {
  showTimeInput?: boolean;
  timeLabel?: React.ReactNode;
  selected: Date | undefined;
  onSelect: (date: Date | undefined) => void;
};

function getTimeString(date?: Date) {
  if (!date) return "00:00:00";
  return [
    date.getHours().toString().padStart(2, "0"),
    date.getMinutes().toString().padStart(2, "0"),
    date.getSeconds().toString().padStart(2, "0"),
  ].join(":");
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
  // Local state is NOT needed, everything is controlled by parent
  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!selected) return;
    const value = e.target.value || "00:00:00";
    const [h, m, s] = value.split(":").map((v) => parseInt(v, 10) || 0);
    const updated = new Date(selected);
    updated.setHours(h, m, s, 0);
    onSelect(updated);
  };

  return (
    <div>
      <DayPicker
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
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
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
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
          ...classNames,
        }}
        components={{
          IconLeft: ({ ..._props }) => <ChevronLeft className="h-4 w-4" />,
          IconRight: ({ ..._props }) => <ChevronRight className="h-4 w-4" />,
        }}
        selected={selected}
        onSelect={onSelect}
        {...props}
      />
      {showTimeInput && selected && (
        <div
          className="flex items-center justify-between gap-2 mt-3 mb-2 border border-paycard-navy-200 rounded-md px-2 py-2 bg-white w-[95%] mx-auto"
          style={{ minWidth: 180, maxWidth: 250 }}
        >
          <label htmlFor="delay-time" className="text-xs font-medium text-paycard-navy mr-2">
            {timeLabel}
          </label>
          <input
            id="delay-time"
            type="time"
            step="1"
            className="border border-paycard-navy-200 rounded px-2 py-1 bg-white w-[110px] text-right font-mono"
            value={getTimeString(selected)}
            onChange={handleTimeChange}
          />
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";

export { Calendar };
