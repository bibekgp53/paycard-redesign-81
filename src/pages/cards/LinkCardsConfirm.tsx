
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/custom/Button";
import { CheckCircle2 } from "lucide-react";

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

const LinkCardsConfirm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData | null>(null);
  const [cards, setCards] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    // Retrieve form data from session storage
    const storedData = sessionStorage.getItem("linkCardsFormData");
    
    if (!storedData) {
      // Redirect back to the form if no data is found
      navigate("/cards/link");
      return;
    }
    
    const parsedData: FormData = JSON.parse(storedData);
    setFormData(parsedData);
    
    // Generate the list of cards based on input method
    if (parsedData.inputMethod === "cardNumbers") {
      // Use the individual card numbers
      setCards(parsedData.cardNumbers.map((card) => card.value));
    } else {
      // Generate the sequence of cards
      const start = parseInt(parsedData.startSequence);
      const end = parseInt(parsedData.endSequence);
      const generatedCards = [];
      
      for (let i = start; i <= end; i++) {
        generatedCards.push(i.toString().padStart(parsedData.startSequence.length, "0"));
      }
      
      setCards(generatedCards);
    }
  }, [navigate]);
  
  const handleBack = () => {
    navigate("/cards/link");
  };
  
  const handleConfirm = () => {
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Clear the form data from session storage
      sessionStorage.removeItem("linkCardsFormData");
    }, 1500);
  };
  
  const handleDone = () => {
    navigate("/dashboard");
  };
  
  if (!formData) {
    return <div>Loading...</div>;
  }
  
  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white shadow-md rounded-lg p-6">
        {isSuccess ? (
          <div className="text-center py-8">
            <CheckCircle2 className="mx-auto h-16 w-16 text-paycard-green mb-4" />
            <h1 className="text-2xl font-bold text-paycard-navy mb-2">
              Cards Linked Successfully
            </h1>
            <p className="text-gray-600 mb-8">
              {cards.length} cards have been linked to profile {formData.profileNumber}.
            </p>
            <Button variant="primary" onClick={handleDone}>
              Return to Dashboard
            </Button>
          </div>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-paycard-navy mb-6">
              Confirm Link Cards
            </h1>
            
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-paycard-navy mb-3">Summary</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 mb-6">
                <div>
                  <p className="text-sm text-gray-500">Profile Number</p>
                  <p className="font-medium">{formData.profileNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Total Cards</p>
                  <p className="font-medium">{cards.length}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Processed By</p>
                  <p className="font-medium">{formData.processedBy}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Invoice Number</p>
                  <p className="font-medium">{formData.invoiceNumber}</p>
                </div>
              </div>
              
              <div>
                <h3 className="text-md font-semibold text-paycard-navy mb-2">
                  Cards to be Linked
                </h3>
                
                <div className="max-h-60 overflow-y-auto border border-paycard-navy-200 rounded-md p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cards.map((card, index) => (
                      <div key={index} className="text-sm bg-paycard-navy-100 p-2 rounded">
                        {card}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="secondary" onClick={handleBack} disabled={isSubmitting}>
                Back
              </Button>
              <Button
                variant="primary"
                onClick={handleConfirm}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Processing..." : "Confirm"}
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LinkCardsConfirm;
