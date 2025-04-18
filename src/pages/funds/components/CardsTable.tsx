import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell, TableFooter } from "@/components/ui/table";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountCard, ClientSettings } from "@/graphql/types";

// Helper function to mask card number
const maskCardNumber = (cardNumber: string) => {
  if (cardNumber.length <= 6) return cardNumber; // If card number is too short, return as is
  
  const firstTwoDigits = cardNumber.slice(0, 2);
  const lastFourDigits = cardNumber.slice(-4);
  const maskedPart = '*'.repeat(cardNumber.length - 6);
  
  return `${firstTwoDigits}${maskedPart}${lastFourDigits}`;
};

interface CardsTableProps {
  cards: AccountCard[];
  isLoading: boolean;
  amountInputs: { [key: string]: number | null };
  clientSettings: ClientSettings | undefined;
  onAmountChange: (cardId: string, value: string) => void;
  getFeeForCard: (cardId: string) => string;
  isAmountValid: (cardId: string, cardBalance: number) => boolean;
  getTooltipMessage: (cardBalance: number) => string;
  totals: { amount: number; fee: number };
}

export const CardsTable = ({
  cards,
  isLoading,
  amountInputs,
  clientSettings,
  onAmountChange,
  getFeeForCard,
  isAmountValid,
  getTooltipMessage,
  totals,
}: CardsTableProps) => {
  return (
    <div className="overflow-x-auto">
      <TooltipProvider>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>NAME</TableHead>
              <TableHead>CARD NUMBER</TableHead>
              <TableHead>AMOUNT</TableHead>
              <TableHead>FEE</TableHead>
              <TableHead>NOTIFY VIA SMS</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">Loading...</TableCell>
              </TableRow>
            ) : cards.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center">No cards found</TableCell>
              </TableRow>
            ) : cards.map((card) => (
              <TableRow key={card.id}>
                <TableCell>{card.cardholder}</TableCell>
                <TableCell>{maskCardNumber(card.cardNumber)}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Input
                          type="number"
                          placeholder="0.00"
                          className={`w-32 ${!isAmountValid(card.id, card.balance) ? 'border-paycard-red ring-1 ring-paycard-red' : ''}`}
                          value={amountInputs[card.id] || ""}
                          onChange={(e) => onAmountChange(card.id, e.target.value)}
                          min={clientSettings?.details.clientMinCardLoad || 0}
                          step="0.01"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{getTooltipMessage(card.balance)}</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TableCell>
                <TableCell>{getFeeForCard(card.id)}</TableCell>
                <TableCell>
                  <Checkbox />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          {cards && cards.length > 0 && (
            <TableFooter>
              <TableRow className="bg-muted/50">
                <TableCell colSpan={2} className="text-right font-medium">Totals:</TableCell>
                <TableCell className="font-medium">R {totals.amount.toFixed(2)}</TableCell>
                <TableCell className="font-medium">R {totals.fee.toFixed(2)}</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableFooter>
          )}
        </Table>
      </TooltipProvider>
    </div>
  );
};
