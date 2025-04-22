
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton as Button } from "@/components/ui/custom-button";
import { CustomInput as Input } from "@/components/ui/custom-input";
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
  
  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleContinue = () => {
    navigate("/cards/allocate/confirm", { state: { formData } });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <button 
          onClick={handleBack}
          className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-paycard-navy" />
        </button>

        <h1 className="text-2xl font-bold text-paycard-navy mb-6 text-center">
          Card holder details
        </h1>
        
        <div className="text-center mb-8 text-gray-600">
          <p>You have 1 cards linked to your profile. 2 cards have not yet been allocated.</p>
          <p>Cards must be allocated before they can be used</p>
        </div>

        <form className="space-y-4 mb-8">
          <div className="grid grid-cols-2 gap-4">
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
          </div>
          <div className="grid grid-cols-2 gap-4">
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
          </div>
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
            onClick={handleContinue}
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
}
