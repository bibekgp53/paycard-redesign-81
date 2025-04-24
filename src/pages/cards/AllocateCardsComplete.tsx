import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { CheckCircle2 } from "lucide-react";

export default function AllocateCardsComplete() {
  const navigate = useNavigate();
  const location = useLocation();
  const { allocationType } = location.state || {};

  const currentStep = allocationType === "search" ? 4 : 3;
  const totalSteps = allocationType === "search" ? 4 : 3;

  const handleFinished = () => {
    navigate("/cards/allocate");
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2">40</div>
            <div className="text-sm">Total Cards</div>
          </div>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2">20</div>
            <div className="text-sm">Unallocated Cards</div>
          </div>
        </Card>
        <Card className="border border-gray-200">
          <div className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">10</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </div>
        </Card>
      </div>

      <Card>
        <div className="p-6 text-center">
          <div className="flex justify-center mb-6">
            <CheckCircle2 className="w-16 h-16 text-green-500" />
          </div>
          
          <h1 className="text-3xl font-bold text-paycard-navy mb-4">
            Complete
          </h1>
          
          <p className="text-gray-600 mb-8">
            1 card was successfully allocated.
          </p>

          <Button
            variant="default"
            className="w-48 mx-auto"
            onClick={handleFinished}
          >
            I'M FINISHED
          </Button>
        </div>
      </Card>
    </div>
  );
}
