
import { Card } from "@/components/ui/card";
import { useNavigate, useLocation } from "react-router-dom";
import { Wallet, CreditCard } from "lucide-react";

export default function LoadFundsFrom() {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Function to check if the path starts with the given route
  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </Card>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => navigate("/load-funds-from/to?accountFrom=false")}
          className="text-left transition-all hover:scale-[1.02] focus:outline-none"
        >
          <Card className={`p-6 h-full border-2 ${
            isActive("/load-funds-from/to") && !location.search.includes("accountFrom=true")
              ? "border-paycard-salmon"
              : "hover:border-paycard-salmon border-transparent"
          }`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-paycard-navy-100">
                <Wallet className="h-6 w-6 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-paycard-navy mb-2">
                  Load funds from your profile
                </h3>
                <p className="text-gray-600">
                  Transfer funds directly from your profile balance to cards
                </p>
              </div>
            </div>
          </Card>
        </button>

        <button
          onClick={() => navigate("/load-funds-from/to?accountFrom=true")}
          className="text-left transition-all hover:scale-[1.02] focus:outline-none"
        >
          <Card className={`p-6 h-full border-2 ${
            isActive("/load-funds-from/to") && location.search.includes("accountFrom=true")
              ? "border-paycard-salmon"
              : "hover:border-paycard-salmon border-transparent"
          }`}>
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-paycard-navy-100">
                <CreditCard className="h-6 w-6 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-paycard-navy mb-2">
                  Load funds from another card
                </h3>
                <p className="text-gray-600">
                  Transfer remaining balance from a stopped card
                </p>
              </div>
            </div>
          </Card>
        </button>
      </div>
    </div>
  );
}

