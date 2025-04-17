
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/custom/Input";
import { Button } from "@/components/ui/custom/Button";

interface CardField {
  id: string;
  value: string;
}

interface CardNumberInputsProps {
  cardNumbers: CardField[];
  errors: Record<string, string>;
  onCardNumberChange: (id: string, value: string) => void;
  onAddCard: () => void;
  onRemoveCard: (id: string) => void;
}

export const CardNumberInputs = ({
  cardNumbers,
  errors,
  onCardNumberChange,
  onAddCard,
  onRemoveCard,
}: CardNumberInputsProps) => {
  return (
    <div className="space-y-4 mb-6">
      <h2 className="text-lg font-semibold text-paycard-navy">Card Numbers</h2>
      
      {cardNumbers.map((card) => (
        <div key={card.id} className="flex items-start space-x-2">
          <div className="flex-1">
            <Input
              label={card.id === "1" ? "Card Number/Tracking Number" : ""}
              placeholder="Enter card number"
              value={card.value}
              onChange={(e) => onCardNumberChange(card.id, e.target.value)}
              error={errors[`cardNumber-${card.id}`]}
            />
          </div>
          {cardNumbers.length > 1 && (
            <button
              type="button"
              className="mt-8 p-2 text-gray-500 hover:text-paycard-red"
              onClick={() => onRemoveCard(card.id)}
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
        onClick={onAddCard}
      >
        Add Another Card
      </Button>
    </div>
  );
};
