
import { Plus, Trash2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

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
      {cardNumbers.map((card, idx) => (
        <div key={card.id} className="flex items-center gap-2">
          <div className="flex-1 relative flex flex-col justify-center">
            <label
              className={
                card.id === "1"
                  ? "block text-sm font-medium font-gilroy text-paycard-navy mb-1"
                  : "sr-only"
              }
            >
              {card.id === "1" ? "Card Number/Tracking Number" : ""}
            </label>
            <Input
              placeholder="Enter card number"
              value={card.value}
              onChange={(e) => onCardNumberChange(card.id, e.target.value)}
              className={`${
                errors[`cardNumber-${card.id}`]
                  ? "border-paycard-red ring-1 ring-paycard-red"
                  : ""
              }`}
            />
            {errors[`cardNumber-${card.id}`] && (
              <p className="mt-1 text-sm font-poppins text-paycard-red body-small">{errors[`cardNumber-${card.id}`]}</p>
            )}
          </div>
          {cardNumbers.length > 1 && (
            <button
              type="button"
              className="flex items-center justify-center h-10 w-10 rounded-md hover:bg-paycard-red/10 transition-colors ml-1"
              onClick={() => onRemoveCard(card.id)}
              aria-label="Remove card"
              tabIndex={0}
            >
              <Trash2 className="text-paycard-red" size={20} strokeWidth={2} />
            </button>
          )}
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        onClick={onAddCard}
        className="flex items-center gap-2"
      >
        <Plus size={16} />
        Add Another Card
      </Button>
    </div>
  );
};
