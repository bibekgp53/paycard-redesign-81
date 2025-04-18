
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";
import { Input } from "@/components/ui/custom/Input";
import { ArrowLeft } from "lucide-react";

export default function AllocateCardsDetails() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const [formData, setFormData] = useState({
    firstName: "",
    surname: "",
    idNumber: "",
    cellphone: "",
    reference: ""
  });

  const handleChange = (field: keyof typeof formData) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className="max-w-3xl mx-auto">
      <button 
        onClick={handleBack}
        className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
        aria-label="Go back"
      >
        <ArrowLeft size={24} className="text-paycard-navy" />
      </button>

      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-6 text-center">
          Card holder details
        </h1>
        
        <div className="text-center mb-8 text-gray-600">
          <p>You have 1 cards linked to your profile. 2 cards have not yet been allocated.</p>
          <p>Cards must be allocated before they can be used</p>
        </div>

        <form className="space-y-4 mb-8">
          <Input
            label="FIRST NAME"
            value={formData.firstName}
            onChange={handleChange("firstName")}
            required
          />
          <Input
            label="SURNAME"
            value={formData.surname}
            onChange={handleChange("surname")}
            required
          />
          <Input
            label="ID/PASSPORT NUMBER"
            value={formData.idNumber}
            onChange={handleChange("idNumber")}
            required
          />
          <Input
            label="CELLPHONE NUMBER"
            value={formData.cellphone}
            onChange={handleChange("cellphone")}
            required
          />
          <Input
            label="REFERENCE"
            value={formData.reference}
            onChange={handleChange("reference")}
          />

          <div className="mt-6 text-sm text-gray-600">
            <p>Card Number: 53*****5311</p>
            <p>Sequence Number: 101991</p>
            <p>Tracking Number:</p>
          </div>
        </form>

        <div className="flex justify-between items-center mt-8">
          <div className="text-sm text-gray-600">
            {currentStep} of {totalSteps}
          </div>
          <div className="space-x-4">
            <Button
              variant="secondary"
              onClick={handlePrevious}
              disabled={currentStep === 1}
            >
              PREVIOUS
            </Button>
            <Button
              variant="primary"
              onClick={handleNext}
            >
              NEXT
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <Button
            variant="primary"
            fullWidth
            onClick={() => navigate("/cards")}
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}
