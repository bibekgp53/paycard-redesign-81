
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, CreditCard } from "lucide-react";

export default function LoadFundsFrom() {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </Card>

      {/* Options Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <button
          onClick={() => navigate("/load-funds-from/to?accountFrom=false")}
          className="text-left transition-all hover:scale-[1.02] focus:outline-none"
        >
          <Card className="p-6 h-full border-2 hover:border-paycard-salmon">
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
          <Card className="p-6 h-full border-2 hover:border-paycard-salmon">
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
