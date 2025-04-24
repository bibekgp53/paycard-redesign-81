import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { StepIndicator } from "@/components/ui/step-indicator";
import { allocateCard, CardAllocationForm } from "@/services/cardAllocation";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function AllocateCardsDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cardNumber, sequenceNumber, trackingNumber, allocationType } = location.state || {};
  
  const currentStep = allocationType === "search" ? 2 : 1;
  const totalSteps = allocationType === "search" ? 4 : 3;

  const [formData, setFormData] = useState<CardAllocationForm>({
    firstName: "",
    surname: "",
    idNumber: "",
    cellphone: "",
    reference: ""
  });

  const { mutate: submitAllocation, isLoading } = useMutation({
    mutationFn: () => allocateCard(cardNumber, formData),
    onSuccess: () => {
      navigate("/cards/allocate/confirm", { 
        state: { 
          formData,
          cardNumber,
          sequenceNumber,
          trackingNumber,
          allocationType
        } 
      });
    },
    onError: (error) => {
      toast.error("Failed to allocate card. Please try again.");
      console.error("Allocation error:", error);
    }
  });

  const handleChange = (field: keyof CardAllocationForm) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleContinue = () => {
    submitAllocation();
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-paycard-navy">Allocate Card</h1>
        <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
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

            <div className="mt-6 text-sm text-gray-600 space-y-1">
              <p>Card Number: {cardNumber || '-'}</p>
              <p>Sequence Number: {sequenceNumber || '-'}</p>
              <p>Tracking Number: {trackingNumber || '-'}</p>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="flex justify-between">
        <Button
          variant="outline"
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
        <Button onClick={handleContinue} disabled={isLoading}>
          Continue
        </Button>
      </div>
    </div>
  );
}
