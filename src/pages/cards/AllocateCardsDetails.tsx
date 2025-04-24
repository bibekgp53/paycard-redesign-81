
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { ArrowLeft } from "lucide-react";

export default function AllocateCardsDetails() {
  const navigate = useNavigate();
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

  const handleContinue = () => {
    navigate("/cards/allocate/confirm", { state: { formData } });
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={3} totalSteps={3} />
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <Card className="bg-paycard-navy text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">40</div>
            <div className="text-sm">Total Cards</div>
          </CardContent>
        </Card>
        <Card className="bg-paycard-salmon text-white">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2">20</div>
            <div className="text-sm">Unallocated Cards</div>
          </CardContent>
        </Card>
        <Card className="border border-gray-200">
          <CardContent className="p-6">
            <div className="text-4xl font-bold mb-2 text-paycard-navy">10</div>
            <div className="text-sm text-gray-600">Allocated Cards</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <button 
            onClick={handleBack}
            className="mb-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={24} className="text-paycard-navy" />
          </button>

          <h2 className="text-2xl font-bold text-paycard-navy mb-6">Card holder details</h2>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-paycard-navy mb-1">
                  FIRST NAME
                </label>
                <Input
                  value={formData.firstName}
                  onChange={handleChange("firstName")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-paycard-navy mb-1">
                  SURNAME
                </label>
                <Input
                  value={formData.surname}
                  onChange={handleChange("surname")}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-paycard-navy mb-1">
                  ID/PASSPORT NUMBER
                </label>
                <Input
                  value={formData.idNumber}
                  onChange={handleChange("idNumber")}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-paycard-navy mb-1">
                  CELLPHONE NUMBER
                </label>
                <Input
                  value={formData.cellphone}
                  onChange={handleChange("cellphone")}
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-paycard-navy mb-1">
                REFERENCE
              </label>
              <Input
                value={formData.reference}
                onChange={handleChange("reference")}
              />
            </div>

            <div className="mt-6 text-sm text-gray-600">
              <p>Card Number: 53*****5311</p>
              <p>Sequence Number: 101991</p>
              <p>Tracking Number:</p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={handleBack}
        >
          Back
        </Button>
        <Button onClick={handleContinue}>
          Continue
        </Button>
      </div>
    </div>
  );
}
