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

  // Only allow input if string will be a valid partial time (e.g. "12:3" or "23:59:0")
  const allowPartialTime = (val: string) => {
    // Accept empty, H, HH, HH:, HH:M, HH:MM, HH:MM:, HH:MM:S, HH:MM:SS
    if (val.length > 8) return false;
    if (val === "") return true;
    if (/^\d{1,2}$/.test(val)) return true; // Hour only
    if (/^\d{2}:$/.test(val)) return true; // "HH:"
    if (/^\d{2}:\d{1,2}$/.test(val)) return true; // "HH:mm"
    if (/^\d{2}:\d{2}:$/.test(val)) return true; // "HH:mm:"
    if (/^\d{2}:\d{2}:\d{1,2}$/.test(val)) return true; // "HH:mm:ss"
    return false;
  };

  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9:]/g, "");
    if (allowPartialTime(raw)) {
      setLocalTime(raw);
      setInputError(false);
    }
  };

  // Prevent any key except digits, colon, Backspace, Delete, Arrow keys, Home/End, Tab
  const handleTimeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"
    ];
    if (
      (e.key >= "0" && e.key <= "9") ||
      e.key === ":" ||
      allowed.includes(e.key)
    ) {
      // Do nothing
    } else {
      e.preventDefault();
    }
    // Prevent typing more than 8 characters
    if (
      !allowed.includes(e.key) &&
      localTime.length >= 8 &&
      // If something selected, allow replacement
      (!inputRef.current || inputRef.current.selectionStart === inputRef.current.selectionEnd)
    ) {
      e.preventDefault();
    }
  };

  const handleTimeInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('Text');
    const clean = paste.replace(/[^0-9:]/g, "");
    if (clean.length > 8 || !allowPartialTime(clean)) {
      e.preventDefault();
    }
  };

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
    // Require strict HH:mm:ss 24-hour
    if (TIME_REGEX.test(localTime)) {
      setInputError(false);
      const { hours, minutes, seconds } = parseTimeFromString24(localTime);
      const updated = new Date(selected.getTime());
      updated.setHours(hours, minutes, seconds, 0);
      onSelect(updated, { fromTimeInput: true });
      setLocalTime(getTimeString24(updated));
      return;
    }
    // Not valid: show error
    setInputError(true);
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
          <div className="relative flex items-center">
            <input
              id="delay-time"
              type="text"
              pattern="^([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d$"
              placeholder="HH:mm:ss"
              className={cn(
                "border border-paycard-navy-200 rounded px-2 py-1 font-mono bg-white text-left tracking-widest",
                inputError
                  ? "border-paycard-red ring-1 ring-paycard-red pr-8"
                  : "focus:border-paycard-navy-400",
                "w-[8ch] min-w-[8ch] max-w-[8ch]" // exactly 8 characters width
              )}
              value={localTime}
              ref={inputRef}
              onChange={handleTimeInputChange}
              onKeyDown={handleTimeInputKeyDown}
              onPaste={handleTimeInputPaste}
              onFocus={handleTimeInputFocus}
              onBlur={handleTimeInputBlur}
              autoComplete="off"
              inputMode="numeric"
              aria-invalid={inputError}
              // maxLength removed since we now restrict by logic
            />
            {inputError && (
              <span className="absolute right-1 top-0 flex items-center h-full text-paycard-red" title="Invalid time format">
                {/* Lucide AlertCircle icon */}
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" className="text-paycard-red" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><circle cx="12" cy="16" r="1" /></svg>
              </span>
            )}
          </div>
          {/* Error message below for accessibility */}
          {inputError && (
            <span className="text-xs text-paycard-red pl-1 font-semibold flex items-center mt-0.5">
              Invalid time format (HH:mm:ss)
            </span>
          )}
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";
export { Calendar };
