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

  // Validate input on each key stroke: only allow valid "HH:mm:ss" 24hr
  const handleTimeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9:]/g, "");
    setLocalTime(raw);

    // If the field is empty, don't show an error (let them clear/cancel)
    if (raw === "") {
      setInputError(false);
      return;
    }

    // Show error if not valid
    if (!TIME_REGEX.test(raw)) {
      setInputError(true);
    } else {
      setInputError(false);
    }
  };

  // Only allow digits or colons to be inputted, but block any attempt to
  // add digits/colons that would exceed "HH:mm:ss" format (8 chars, but
  // must also keep correct placement)
  const handleTimeInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"
    ];
    // Allow navigation/edit keys
    if (allowed.includes(e.key)) return;

    // Only accept numbers and colon, block others
    if (!("0123456789:".includes(e.key))) {
      e.preventDefault();
    }

    // Prevent typing more than 8 chars
    if (
      !allowed.includes(e.key) &&
      localTime.length >= 8 &&
      (!inputRef.current || inputRef.current.selectionStart === inputRef.current.selectionEnd)
    ) {
      e.preventDefault();
    }
    // Prevent entering colons in unsupported positions (max 2, and must be at 3rd and 6th chars)
    if (e.key === ":") {
      const selectionStart = inputRef.current ? inputRef.current.selectionStart || 0 : 0;
      if (selectionStart !== 2 && selectionStart !== 5) e.preventDefault();
      if ((localTime.match(/:/g) || []).length >= 2) e.preventDefault();
    }
  };

  // Block pasting anything not in strict HH:mm:ss
  const handleTimeInputPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('Text');
    const clean = paste.replace(/[^0-9:]/g, "");
    if (!TIME_REGEX.test(clean)) {
      e.preventDefault();
      setInputError(true);
    }
  };

  const handleTimeInputBlur = () => {
    setInputFocused(false);
    // If cleared, just reset and don't error
    if (localTime === "") {
      setInputError(false);
      setLocalTime("");
      return;
    }
    // Show error, and reset to previous (last valid) if it's not a good time
    if (!TIME_REGEX.test(localTime)) {
      setInputError(true);
      if (selected) setLocalTime(getTimeString24(selected));
      else setLocalTime("");
      return;
    }
    setInputError(false);
    // Only update if valid and changed
    if (selected) {
      const { hours, minutes, seconds } = parseTimeFromString24(localTime);
      const updated = new Date(selected.getTime());
      updated.setHours(hours, minutes, seconds, 0);
      if (updated.getTime() !== selected.getTime()) {
        onSelect(updated, { fromTimeInput: true });
      }
      setLocalTime(getTimeString24(updated));
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
          style={{ minWidth: 180, maxWidth: 320 }}
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
                "w-[100px] min-w-[100px] max-w-[100px]" // fits "HH:mm:ss"
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
