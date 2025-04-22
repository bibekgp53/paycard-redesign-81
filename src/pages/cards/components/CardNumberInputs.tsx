
import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";
import React from "react";

interface CardNumberInputsProps {
  cardNumbers: { id: string; value: string }[];
  errors: Record<string, string>;
  onCardNumberChange: (id: string, value: string) => void;
  onAddCard: () => void;
  onRemoveCard: (id: string) => void;
}

export const CardNumberInputs: React.FC<CardNumberInputsProps> = ({
  cardNumbers,
  errors,
  onCardNumberChange,
  onAddCard,
  onRemoveCard,
}) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium font-gilroy text-paycard-navy mb-1">
        Card Numbers
      </label>
      {cardNumbers.map((card, idx) => (
        <div key={card.id} className="flex items-center gap-2 mb-2">
          <Input
            placeholder={`Enter card number ${idx + 1}`}
            value={card.value}
            onChange={(e) => onCardNumberChange(card.id, e.target.value)}
            className={`h-10 py-2 text-sm ${errors[`cardNumber-${card.id}`] ? "border-paycard-red ring-1 ring-paycard-red" : ""}`}
            style={{ minWidth: 0, flex: 1 }}
          />
          {cardNumbers.length > 1 && (
            <button
              type="button"
              onClick={() => onRemoveCard(card.id)}
              className="ml-1 p-1 rounded hover:bg-paycard-navy-100 transition-colors"
              aria-label="Remove card number"
              tabIndex={0}
            >
              <Trash2 className="text-paycard-red w-5 h-5" />
            </button>
          )}
        </div>
      ))}
      <button
        type="button"
        onClick={onAddCard}
        className="mt-2 btn-secondary text-sm"
      >
        + Add Card
      </button>
      {cardNumbers.some((card) => errors[`cardNumber-${card.id}`]) && (
        <div className="mt-1">
          {cardNumbers.map(
            (card) =>
              errors[`cardNumber-${card.id}`] && (
                <p
                  key={card.id}
                  className="text-sm font-poppins text-paycard-red body-small"
                >
                  {errors[`cardNumber-${card.id}`]}
                </p>
              )
          )}
        </div>
      )}
    </div>
  );
};
