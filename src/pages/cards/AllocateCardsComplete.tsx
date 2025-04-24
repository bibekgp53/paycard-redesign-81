
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

export default function AllocateCardsComplete() {
  const navigate = useNavigate();

  const handleFinished = () => {
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-white shadow-md rounded-lg p-8">
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
          className="w-48"
          onClick={handleFinished}
        >
          I'M FINISHED
        </Button>
      </div>
    </div>
  );
}
