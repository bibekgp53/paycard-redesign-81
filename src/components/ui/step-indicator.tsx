
import { Progress } from "@/components/ui/progress";

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
}

export function StepIndicator({ currentStep, totalSteps }: StepIndicatorProps) {
  const progress = (currentStep / totalSteps) * 100;

  return (
    <div className="flex items-center justify-end gap-2 mb-6">
      <span className="text-sm text-paycard-navy">
        Step {currentStep} of {totalSteps}
      </span>
      <Progress value={progress} className="w-32 bg-gray-100" />
    </div>
  );
}
