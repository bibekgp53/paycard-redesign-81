
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/custom/Button";
import { Input } from "@/components/ui/custom/Input";
import { Select } from "@/components/ui/custom/Select";
import { RadioGroup } from "@/components/ui/custom/RadioGroup";

interface CardField {
  id: string;
  value: string;
}

interface FormData {
  profileNumber: string;
  inputMethod: string;
  cardNumbers: CardField[];
  startSequence: string;
  endSequence: string;
  processedBy: string;
  invoiceNumber: string;
}

const profileOptions = [
  { value: "", label: "Select a profile" },
  { value: "PRF001", label: "PRF001 - Company A" },
  { value: "PRF002", label: "PRF002 - Company B" },
  { value: "PRF003", label: "PRF003 - Company C" },
];

const LinkCardsForm = () => {
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState<FormData>({
    profileNumber: "",
    inputMethod: "cardNumbers",
    cardNumbers: [{ id: "1", value: "" }],
    startSequence: "",
    endSequence: "",
    processedBy: "",
    invoiceNumber: "",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  const handleProfileChange = (value: string) => {
    setFormData({ ...formData, profileNumber: value });
  };
  
  const handleInputMethodChange = (value: string) => {
    setFormData({ ...formData, inputMethod: value });
  };
  
  const handleCardNumberChange = (id: string, value: string) => {
    const updatedCardNumbers = formData.cardNumbers.map((card) =>
      card.id === id ? { ...card, value } : card
    );
    setFormData({ ...formData, cardNumbers: updatedCardNumbers });
  };
  
  const addCardNumberField = () => {
    const newId = String(formData.cardNumbers.length + 1);
    setFormData({
      ...formData,
      cardNumbers: [...formData.cardNumbers, { id: newId, value: "" }],
    });
  };
  
  const removeCardNumberField = (id: string) => {
    if (formData.cardNumbers.length > 1) {
      const updatedCardNumbers = formData.cardNumbers.filter(
        (card) => card.id !== id
      );
      setFormData({ ...formData, cardNumbers: updatedCardNumbers });
    }
  };
  
  const handleSequenceChange = (field: "startSequence" | "endSequence", value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const handleChange = (field: "processedBy" | "invoiceNumber", value: string) => {
    setFormData({ ...formData, [field]: value });
  };
  
  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.profileNumber) {
      newErrors.profileNumber = "Profile number is required";
    }
    
    if (formData.inputMethod === "cardNumbers") {
      formData.cardNumbers.forEach((card, index) => {
        if (!card.value) {
          newErrors[`cardNumber-${card.id}`] = "Card number is required";
        } else if (!/^\d+$/.test(card.value)) {
          newErrors[`cardNumber-${card.id}`] = "Card number must contain only digits";
        }
      });
    } else {
      if (!formData.startSequence) {
        newErrors.startSequence = "Start sequence is required";
      } else if (!/^\d+$/.test(formData.startSequence)) {
        newErrors.startSequence = "Start sequence must contain only digits";
      }
      
      if (!formData.endSequence) {
        newErrors.endSequence = "End sequence is required";
      } else if (!/^\d+$/.test(formData.endSequence)) {
        newErrors.endSequence = "End sequence must contain only digits";
      } else if (
        parseInt(formData.endSequence) <= parseInt(formData.startSequence)
      ) {
        newErrors.endSequence = "End sequence must be greater than start sequence";
      }
    }
    
    if (!formData.processedBy) {
      newErrors.processedBy = "Processed by is required";
    }
    
    if (!formData.invoiceNumber) {
      newErrors.invoiceNumber = "Invoice number is required";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Store form data in session storage for the confirmation page
      sessionStorage.setItem("linkCardsFormData", JSON.stringify(formData));
      navigate("/cards/link/confirm");
    }
  };
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-6">Link Cards</h1>
        
        <form onSubmit={handleSubmit}>
          <Select
            label="Profile Number"
            options={profileOptions}
            value={formData.profileNumber}
            onChange={handleProfileChange}
            error={errors.profileNumber}
          />
          
          <RadioGroup
            label="Input Method"
            name="inputMethod"
            options={[
              { value: "cardNumbers", label: "Card Numbers" },
              { value: "sequenceNumbers", label: "Sequence Numbers" },
            ]}
            value={formData.inputMethod}
            onChange={handleInputMethodChange}
            inline
            className="mb-6"
          />
          
          {formData.inputMethod === "cardNumbers" ? (
            <div className="space-y-4 mb-6">
              <h2 className="text-lg font-semibold text-paycard-navy">Card Numbers</h2>
              
              {formData.cardNumbers.map((card) => (
                <div key={card.id} className="flex items-start space-x-2">
                  <div className="flex-1">
                    <Input
                      label={card.id === "1" ? "Card Number/Tracking Number" : ""}
                      placeholder="Enter card number"
                      value={card.value}
                      onChange={(e) => handleCardNumberChange(card.id, e.target.value)}
                      error={errors[`cardNumber-${card.id}`]}
                    />
                  </div>
                  {formData.cardNumbers.length > 1 && (
                    <button
                      type="button"
                      className="mt-8 p-2 text-gray-500 hover:text-paycard-red"
                      onClick={() => removeCardNumberField(card.id)}
                    >
                      <Trash2 size={20} />
                    </button>
                  )}
                </div>
              ))}
              
              <Button
                type="button"
                variant="outline"
                iconLeft={<Plus size={16} />}
                onClick={addCardNumberField}
              >
                Add Another Card
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <Input
                label="Start Sequence"
                placeholder="Enter start sequence"
                value={formData.startSequence}
                onChange={(e) => handleSequenceChange("startSequence", e.target.value)}
                error={errors.startSequence}
              />
              <Input
                label="End Sequence"
                placeholder="Enter end sequence"
                value={formData.endSequence}
                onChange={(e) => handleSequenceChange("endSequence", e.target.value)}
                error={errors.endSequence}
              />
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Input
              label="Processed By"
              placeholder="Enter name"
              value={formData.processedBy}
              onChange={(e) => handleChange("processedBy", e.target.value)}
              error={errors.processedBy}
            />
            <Input
              label="Invoice Number"
              placeholder="Enter invoice number"
              value={formData.invoiceNumber}
              onChange={(e) => handleChange("invoiceNumber", e.target.value)}
              error={errors.invoiceNumber}
            />
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button variant="secondary" type="button" onClick={() => navigate(-1)}>
              Back
            </Button>
            <Button variant="primary" type="submit">
              Continue
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LinkCardsForm;
