
import { Input } from "@/components/ui/input";

interface SequenceInputsProps {
  startSequence: string;
  endSequence: string;
  errors: Record<string, string>;
  onSequenceChange: (field: "startSequence" | "endSequence", value: string) => void;
}

export const SequenceInputs = ({
  startSequence,
  endSequence,
  errors,
  onSequenceChange,
}: SequenceInputsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
      <div className="mb-4">
        <label className="block text-sm font-medium font-poppins text-paycard-navy mb-1">
          Start Sequence
        </label>
        <Input
          placeholder="Enter start sequence"
          value={startSequence}
          onChange={(e) => onSequenceChange("startSequence", e.target.value)}
          className={errors.startSequence ? "border-paycard-red ring-1 ring-paycard-red" : ""}
        />
        {errors.startSequence && (
          <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors.startSequence}</p>
        )}
      </div>
      <div className="mb-4">
        <label className="block text-sm font-medium font-poppins text-paycard-navy mb-1">
          End Sequence
        </label>
        <Input
          placeholder="Enter end sequence"
          value={endSequence}
          onChange={(e) => onSequenceChange("endSequence", e.target.value)}
          className={errors.endSequence ? "border-paycard-red ring-1 ring-paycard-red" : ""}
        />
        {errors.endSequence && (
          <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors.endSequence}</p>
        )}
      </div>
    </div>
  );
};
