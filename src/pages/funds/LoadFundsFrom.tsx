
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { Wallet, CreditCard } from "lucide-react";
import { useLoadFundsToOptionStore } from "@/store/useLoadFundsToOptionStore";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";

export default function LoadFundsFrom() {
  const navigate = useNavigate();
  const {
    selectedLoadFundsToCard,
    setSelectedLoadFundsToCard,
  } = useLoadFundsToOptionStore();

  const handleOptionSelect = (value: string) => {
    setSelectedLoadFundsToCard(value as "card-loads" | "search");
    navigate(`/load-funds-from/to?accountFrom=${value === "search"}`);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-white p-6">
        <h1 className="text-2xl font-bold text-paycard-navy mb-2">Load funds into card</h1>
        <p className="text-gray-600">
          Load funds into cards from your profile or transfer funds from a stopped card.
        </p>
      </Card>

      <RadioGroup 
        value={selectedLoadFundsToCard || ""} 
        onValueChange={handleOptionSelect}
        className="flex flex-col gap-6"
      >
        <label className="cursor-pointer">
          <Card className={`p-6 h-full border-2 transition-all hover:scale-[1.02] ${
            selectedLoadFundsToCard === "card-loads"
              ? "border-paycard-salmon"
              : "hover:border-paycard-salmon border-transparent"
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value="card-loads" id="card-loads" />
                <div className="p-3 rounded-full bg-paycard-navy-100">
                  <Wallet className="h-6 w-6 text-paycard-navy" />
                </div>
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
        </label>

        <label className="cursor-pointer">
          <Card className={`p-6 h-full border-2 transition-all hover:scale-[1.02] ${
            selectedLoadFundsToCard === "search"
              ? "border-paycard-salmon"
              : "hover:border-paycard-salmon border-transparent"
          }`}>
            <div className="flex items-start gap-4">
              <div className="flex items-center gap-4">
                <RadioGroupItem value="search" id="search" />
                <div className="p-3 rounded-full bg-paycard-navy-100">
                  <CreditCard className="h-6 w-6 text-paycard-navy" />
                </div>
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
        </label>
      </RadioGroup>
    </div>
  );
}
