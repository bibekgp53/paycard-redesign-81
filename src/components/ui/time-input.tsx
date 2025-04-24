import React from "react";
import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

// Regex for strict format: HH:mm:ss with 24-hour time
const TIME_REGEX = /^([01]\d|2[0-3]):[0-5]\d:[0-5]\d$/;

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
  const [rawHours, rawMinutes, rawSeconds] = value.split(":");
  let h = Math.min(23, Math.max(0, parseInt(rawHours, 10) || 0));
  let m = Math.min(59, Math.max(0, parseInt(rawMinutes, 10) || 0));
  let s = typeof rawSeconds !== "undefined" ? Math.min(59, Math.max(0, parseInt(rawSeconds, 10) || 0)) : 0;
  return { hours: h, minutes: m, seconds: s };
}

interface TimeInputProps {
  value: Date | undefined;
  onChange: (date: Date | undefined, opts?: { fromTimeInput?: boolean }) => void;
  label?: React.ReactNode;
  disabled?: boolean;
}

export const TimeInput: React.FC<TimeInputProps> = ({
  value,
  onChange,
  label = "Time",
  disabled = false,
}) => {
  const [localTime, setLocalTime] = React.useState(() => getTimeString24(value));
  const [inputFocused, setInputFocused] = React.useState(false);
  const [inputError, setInputError] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useEffect(() => {
    if (inputFocused) return;
    if (!value) setLocalTime("");
    else setLocalTime(getTimeString24(value));
    setInputError(false);
  }, [value, inputFocused]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9:]/g, "");
    setLocalTime(raw);
    if (raw === "") {
      setInputError(false);
      return;
    }
    if (!TIME_REGEX.test(raw)) setInputError(true);
    else setInputError(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const allowed = [
      "Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"
    ];
    if (allowed.includes(e.key)) return;

    if (!("0123456789:".includes(e.key))) {
      e.preventDefault();
    }

    if (
      !allowed.includes(e.key) &&
      localTime.length >= 8 &&
      (!inputRef.current || inputRef.current.selectionStart === inputRef.current.selectionEnd)
    ) {
      e.preventDefault();
    }
    if (e.key === ":") {
      const selectionStart = inputRef.current ? inputRef.current.selectionStart || 0 : 0;
      if (selectionStart !== 2 && selectionStart !== 5) e.preventDefault();
      if ((localTime.match(/:/g) || []).length >= 2) e.preventDefault();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData.getData('Text');
    const clean = paste.replace(/[^0-9:]/g, "");
    if (!TIME_REGEX.test(clean)) {
      e.preventDefault();
      setInputError(true);
    }
  };

  const handleBlur = () => {
    setInputFocused(false);
    if (localTime === "") {
      setInputError(false);
      setLocalTime("");
      return;
    }
    if (!TIME_REGEX.test(localTime)) {
      setInputError(true);
      if (value) setLocalTime(getTimeString24(value));
      else setLocalTime("");
      return;
    }
    setInputError(false);
    if (value) {
      const { hours, minutes, seconds } = parseTimeFromString24(localTime);
      const updated = new Date(value.getTime());
      updated.setHours(hours, minutes, seconds, 0);
      if (updated.getTime() !== value.getTime()) {
        onChange(updated, { fromTimeInput: true });
      }
      setLocalTime(getTimeString24(updated));
    }
  };

  const handleFocus = () => {
    setInputFocused(true);
    setInputError(false);
  };

  return (
    <div
      className="flex flex-row items-center gap-2 mt-3 mb-2 w-full mx-auto px-4 py-3"
      style={{
        minWidth: 210,
        maxWidth: 350,
        borderTop: "1px solid #0F1F38", // THIN top border, primary navy color
        borderLeft: "none",
        borderRight: "none",
        borderBottom: "none",
        background: "white"
      }}
    >
      <label
        htmlFor="delay-time"
        className="text-xs font-medium text-paycard-navy mr-2 min-w-[42px] text-left"
      >
        {label}
      </label>
      <div className="relative flex items-center w-full">
        <input
          id="delay-time"
          type="text"
          placeholder="HH:mm:ss"
          className={cn(
            "border font-mono bg-white text-left tracking-widest px-2 py-1 rounded w-[145px] min-w-[145px] max-w-[145px] outline-none transition-colors pr-8",
            inputError
              ? "border-paycard-red ring-1 ring-paycard-red"
              : "border-paycard-navy-200",
            // Remove focus border if in error state
            !inputError && inputFocused ? "focus:border-paycard-navy-400" : ""
          )}
          value={localTime}
          ref={inputRef}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          autoComplete="off"
          inputMode="numeric"
          aria-invalid={inputError}
          disabled={disabled}
        />
        {inputError && (
          // Position icon INSIDE the input, right-aligned, vertically centered
          <span className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center h-full pointer-events-none">
            <AlertCircle size={18} strokeWidth={2} className="text-paycard-red" />
          </span>
        )}
      </div>
    </div>
  );
};
