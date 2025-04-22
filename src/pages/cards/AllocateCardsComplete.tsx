
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export default function AllocateCardsComplete() {
  const navigate = useNavigate();

  const handleFinished = () => {
    navigate("/dashboard");
  };

  const handleAllocateMore = () => {
    navigate("/cards/allocate");
  };

  const handleDepositFunds = () => {
    // Navigate to deposit funds page when implemented
    navigate("/dashboard");
  };

  const handleLoadFunds = () => {
    // Navigate to load funds page when implemented
    navigate("/dashboard");
  };

  return (
    <div className="max-w-3xl mx-auto text-center">
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-paycard-navy mb-4">
          Complete
        </h1>
        
        <p className="text-gray-600 mb-8">
          1 cards where successfully allocated. You have 8 cards that can still be allocated.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button
            variant="default"
            className="w-full"
            onClick={handleFinished}
          >
            I'M FINISHED
          </Button>
          
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleAllocateMore}
          >
            ALLOCATE MORE CARDS
          </Button>
          
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleDepositFunds}
          >
            DEPOSIT FUNDS
          </Button>
          
          <Button
            variant="secondary"
            className="w-full"
            onClick={handleLoadFunds}
          >
            LOAD FUNDS
          </Button>
        </div>
      </div>
    </div>
  );
}
