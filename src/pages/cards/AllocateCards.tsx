
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";
import { RadioGroup } from "@/components/ui/custom/RadioGroup";
import { Checkbox } from "@/components/ui/checkbox";

export default function AllocateCards() {
  const navigate = useNavigate();
  const [allocationType, setAllocationType] = useState("all");
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleContinue = () => {
    if (!agreedToTerms) {
      return;
    }
    navigate("/cards/allocate/details");
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-6 text-center">Allocate Card</h1>
        
        <div className="text-center mb-8 text-gray-600">
          <p>You have 39 cards linked to your profile. 0 cards have not yet been allocated.</p>
          <p>Cards must be allocated before they can be used</p>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-paycard-navy mb-4">ALLOCATE CARD BY:</h2>
          <RadioGroup
            name="allocationType"
            value={allocationType}
            onChange={value => setAllocationType(value)}
            options={[
              { value: "all", label: "Allocate all cards" },
              { value: "search", label: "Search for cards" }
            ]}
          />
        </div>

        <div className="flex items-start gap-2 mb-8">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            className="mt-1"
          />
          <label htmlFor="terms" className="text-sm text-gray-700">
            I have read {" "}
            <a
              href="#"
              className="text-blue-600 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              the Standard Bank FICA requirements
            </a>
          </label>
        </div>

        <Button
          variant="primary"
          fullWidth
          onClick={handleContinue}
          disabled={!agreedToTerms}
        >
          CONTINUE
        </Button>
      </div>
    </div>
  );
}
