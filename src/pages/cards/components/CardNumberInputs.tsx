
import { Trash2 } from "lucide-react";
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
      {cardNumbers.map((card, idx) => {
        const hasError = !!errors[`cardNumber-${card.id}`];
        return (
          <div key={card.id} className="flex flex-col">
            {/* Label (show only for first) */}
            {card.id === "1" && (
              <label className="block text-sm font-medium font-gilroy text-paycard-navy mb-1">
                Card Number/Tracking Number
              </label>
            )}
            {/* Input + Trash in error border flex row */}
            <div
              className={`
                flex items-center gap-2 
                rounded-md bg-white 
                border
                ${hasError ? "border-paycard-red ring-1 ring-paycard-red" : "border-paycard-navy-200"} 
                px-3 py-2
                transition
                focus-within:ring-2 focus-within:ring-paycard-navy-500
              `}
            >
              <Input
                placeholder="Enter card number"
                value={card.value}
                onChange={(e) => onCardNumberChange(card.id, e.target.value)}
                className="flex-1 shadow-none border-none focus:ring-0 focus-visible:ring-0 px-0 bg-transparent"
                // Remove all input borders since outer flex has border
              />
              {cardNumbers.length > 1 && (
                <button
                  type="button"
                  className="flex items-center justify-center h-8 w-8 rounded hover:bg-paycard-red/10 transition-colors"
                  onClick={() => onRemoveCard(card.id)}
                  aria-label="Remove card"
                  tabIndex={0}
                >
                  <Trash2 className="text-paycard-red" size={20} strokeWidth={2} />
                </button>
              )}
            </div>
            {/* Error message under input+icon */}
            {hasError && (
              <p className="mt-1 text-sm font-poppins text-paycard-red body-small">
                {errors[`cardNumber-${card.id}`]}
              </p>
            )}
          </div>
        );
      })}
      <Button
        type="button"
        variant="outline"
        onClick={onAddCard}
        className="flex items-center gap-2"
      >
        <span>
          {/* Lucide Plus used in Button handled by parent, not here */}
          Add Another Card
        </span>
      </Button>
    </div>
  );
};
