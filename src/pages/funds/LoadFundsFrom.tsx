
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, CreditCard } from "lucide-react";
import { useLoadFundsToOptionStore } from "@/store/useLoadFundsToOptionStore";

export default function LoadFundsFrom() {
  const navigate = useNavigate();
  const {
    selectedLoadFundsToCard,
    setSelectedLoadFundsToCard,
  } = useLoadFundsToOptionStore();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold text-paycard-navy">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <button
          onClick={() => {
            setSelectedLoadFundsToCard("card-loads");
            navigate("/load-funds-from/to?accountFrom=false");
          }}
          className="text-left transition-all hover:scale-[1.01] focus:outline-none"
        >
          <Card className={`p-8 h-full border-2 ${
            selectedLoadFundsToCard === "card-loads"
              ? "border-paycard-salmon"
              : "border-paycard-navy-200 hover:border-paycard-salmon"
          }`}>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-full bg-paycard-navy-100">
                <Wallet className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Load funds from your profile
                </h3>
                <p className="text-gray-600 text-lg">
                  Transfer funds directly from your profile balance to cards
                </p>
              </div>
            </div>
          </Card>
        </button>

        <button
          onClick={() => {
            setSelectedLoadFundsToCard("search");
            navigate("/load-funds-from/to?accountFrom=true");
          }}
          className="text-left transition-all hover:scale-[1.01] focus:outline-none"
        >
          <Card className={`p-8 h-full border-2 ${
            selectedLoadFundsToCard === "search"
              ? "border-paycard-salmon"
              : "border-paycard-navy-200 hover:border-paycard-salmon"
          }`}>
            <div className="flex items-start gap-6">
              <div className="p-4 rounded-full bg-paycard-navy-100">
                <CreditCard className="h-8 w-8 text-paycard-navy" />
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-paycard-navy mb-3">
                  Load funds from another card
                </h3>
                <p className="text-gray-600 text-lg">
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
