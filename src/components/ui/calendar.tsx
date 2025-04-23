
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

function getTimeString24(date?: Date) {
  if (!date) return "";
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

function parseTimeFromString24(value: string) {
  // Supports "HH:mm:ss" or "HH:mm"
  const [rawHours, rawMinutes, rawSeconds] = value.split(":");
  let h = Math.min(23, Math.max(0, parseInt(rawHours, 10) || 0));
  let m = Math.min(59, Math.max(0, parseInt(rawMinutes, 10) || 0));
  let s = typeof rawSeconds !== "undefined" ? Math.min(59, Math.max(0, parseInt(rawSeconds, 10) || 0)) : 0;
  return { hours: h, minutes: m, seconds: s };
}

// Regex for strict format: HH:mm:ss with 24-hour time
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

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
  const [localTime, setLocalTime] = React.useState(() => getTimeString24(selected));
  const [inputFocused, setInputFocused] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputFocused) return;
    if (!selected) {
      setLocalTime("");
    } else {
      setLocalTime(getTimeString24(selected));
    }
    setInputError(false);
  }, [selected, inputFocused]);

  // Only allow in-progress values that could still be valid like "12:", "1", "22:35:4"
  const possiblePartialTime = (value: string) => {
    // Allow empty
    if (value === "") return true;
    // Up to 8 chars, digits or colons, at most 2 colons
    if (!/^[0-9:]{0,8}$/.test(value)) return false;
    if ((value.match(/:/g) || []).length > 2) return false;
    // "12", "12:3", "12:35:4", etc., are ok in progress
    return true;
  };

  // As user types: update only if still structurally possible
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9:]/g, "");
    if (raw.length > 8) return;
    if (possiblePartialTime(raw)) setLocalTime(raw);
  };

  // On blur, enforce HH:mm:ss or clear/error if invalid
  const handleTimeInputBlur = () => {
    setInputFocused(false);
    if (!selected) {
      setInputError(false);
      setLocalTime("");
      return;
    }

    if (localTime === "") {
      setInputError(false);
      setLocalTime("");
      return;
    }

    // If valid, update parent and clear error
    if (TIME_REGEX.test(localTime)) {
      setInputError(false);
      const { hours, minutes, seconds } = parseTimeFromString24(localTime);
      const updated = new Date(selected.getTime());
      updated.setHours(hours, minutes, seconds, 0);
      onSelect(updated, { fromTimeInput: true });
      setLocalTime(getTimeString24(updated));
      return;
    }

    // Try to auto-format incomplete (e.g. 5 -> 05:00:00 or 1512 -> 15:12:00)
    let safeTime = localTime;
    const parts = localTime.split(":");
    let h = parts[0] || "00";
    let m = parts[1] || "00";
    let s = parts[2] || "00";
    if (h.length < 2) h = "0" + h;
    if (m.length < 2) m = m.length > 0 ? "0" + m : "00";
    if (s.length < 2) s = s.length > 0 ? "0" + s : "00";
    safeTime = `${h}:${m}:${s}`;

    if (TIME_REGEX.test(safeTime)) {
      setInputError(false);
      setLocalTime(safeTime);
      const { hours, minutes, seconds } = parseTimeFromString24(safeTime);
      const updated = new Date(selected.getTime());
      updated.setHours(hours, minutes, seconds, 0);
      onSelect(updated, { fromTimeInput: true });
      setLocalTime(getTimeString24(updated));
    } else {
      setInputError(true);
      setLocalTime(""); // Optional: clear input if not valid
    }
  };

  const handleTimeInputFocus = () => {
    setInputFocused(true);
    setInputError(false);
  };

  const handleDaySelect: SelectSingleEventHandler = (date) => {
    if (!date) return;
    if (selected) {
      date.setHours(selected.getHours(), selected.getMinutes(), selected.getSeconds(), 0);
    }
    onSelect(date, { fromTimeInput: false });
  };

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
          className="flex flex-row items-center gap-2 mt-3 mb-2 border border-paycard-navy-200 rounded-md px-2 py-2 bg-white w-full mx-auto"
          style={{ minWidth: 180, maxWidth: 300 }}
        >
          <label htmlFor="delay-time" className="text-xs font-medium text-paycard-navy mr-2 min-w-[42px] text-left">
            {timeLabel}
          </label>
          <input
            id="delay-time"
            type="text"
            pattern="^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"
            placeholder="HH:mm:ss"
            className={cn(
              "border border-paycard-navy-200 rounded px-2 py-1 font-mono bg-white text-left tracking-widest",
              inputError
                ? "border-paycard-red ring-1 ring-paycard-red"
                : "focus:border-paycard-navy-400",
              "w-[90px]"
            )}
            value={localTime}
            ref={inputRef}
            onChange={handleTimeInputChange}
            onFocus={handleTimeInputFocus}
            onBlur={handleTimeInputBlur}
            autoComplete="off"
            maxLength={8}
            inputMode="numeric"
            aria-invalid={inputError}
          />
          {/* Optional: show error message below the input */}
          {/* {inputError && (
            <span className="text-xs text-paycard-red pl-1 font-semibold">
              Invalid time (HH:mm:ss)
            </span>
          )} */}
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";
export { Calendar };

