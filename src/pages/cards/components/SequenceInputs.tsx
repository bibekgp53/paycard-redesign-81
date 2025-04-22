import { CustomInput as Input } from "@/components/ui/custom-input";

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
      <Input
        label="Start Sequence"
        placeholder="Enter start sequence"
        value={startSequence}
        onChange={(e) => onSequenceChange("startSequence", e.target.value)}
        error={errors.startSequence}
      />
      <Input
        label="End Sequence"
        placeholder="Enter end sequence"
        value={endSequence}
        onChange={(e) => onSequenceChange("endSequence", e.target.value)}
        error={errors.endSequence}
      />
    </div>
  );
};
