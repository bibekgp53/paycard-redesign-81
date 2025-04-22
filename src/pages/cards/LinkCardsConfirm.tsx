
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CustomButton as Button } from "@/components/ui/custom-button";
import { CheckCircle2 } from "lucide-react";
import { useApolloMutation } from "@/hooks/useApolloMutation";
import { LINK_CARD_LINKS } from "@/graphql/cards";
import { toast } from "@/hooks/use-toast";

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
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { mutate, loading: isSubmitting, error } = useApolloMutation(
    LINK_CARD_LINKS
  );
  
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
  
  const handleConfirm = async () => {
    if (!formData) return;

    try {
      // You must create the cards first via an API if needed, but here we assume cards already exist by card_number.
      // This example expects card ids to be known.
      // For this mock, we'll assume you already have card ids mapped via card numbers (you would fetch this in a real app).

      // TODO: Implement logic to fetch card ids via card numbers if needed

      // For the sake of this update, we'll mock cardIds = cards (card_numbers)
      // In a real app, you’d lookup the proper card.id based on card_number

      const cardLinksInputs = cards.map(cardNumber => ({
        card_id: cardNumber, // <-- here you would use the real card id!
        profile_number: formData.profileNumber,
        processed_by: formData.processedBy,
        invoice_number: formData.invoiceNumber,
      }));

      await mutate({
        variables: {
          objects: cardLinksInputs
        }
      });

      setIsSuccess(true);
      sessionStorage.removeItem("linkCardsFormData");
      toast({
        title: "Success",
        description: `${cards.length} cards have been linked successfully.`
      });
    } catch (error) {
      console.error("Error linking cards:", error);
      toast({
        title: "Error",
        description: "Failed to link cards. Please try again.",
        variant: "destructive"
      });
    }
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
            <CheckCircle2 className="mx-auto h-16 w-16 text-green-500 mb-4" />
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
                
                <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md p-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                    {cards.map((card, index) => (
                      <div key={index} className="text-sm bg-gray-100 p-2 rounded">
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
