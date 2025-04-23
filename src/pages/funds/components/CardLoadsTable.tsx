
import { useCardLoadsStore, SelectedLoad } from "@/store/useCardLoadsStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { AccountCard, ClientSettings } from "@/graphql/types";
import React from "react";

interface CardLoadsTableProps {
  cards: AccountCard[];
  clientSettings: ClientSettings | undefined;
  page: number;
  pageSize: number;
}

export function CardLoadsTable({ cards, clientSettings, page, pageSize }: CardLoadsTableProps) {
  const {
    amountInputs,
    smsInputs,
    updateAmountInput,
    updateSmsInput,
    selectedLoads,
    addOrUpdateSelectedLoad,
    removeSelectedLoad,
  } = useCardLoadsStore();

  // Utility: find the load object for a specific cardId (by accountCardId)
  function getSelectedLoadObj(accountCardId: number): SelectedLoad | undefined {
    return selectedLoads.find(l => l.accountCardId === accountCardId);
  }

  function getCardInfoByCardId(cardId: string) {
    return cards?.find(c => c.id === cardId);
  }

  const isAmountValid = (cardId: string, cardBalance: number) => {
    const amount = amountInputs[cardId];
    if (amount === undefined || amount === null) return true;
    if (clientSettings) {
      const minAmount = clientSettings.details.clientMinimumCardLoad;
      const maxAmount = clientSettings.details.clientMaximumBalance - cardBalance;
      return amount >= minAmount && amount <= maxAmount;
    }
    return true;
  };

  const getTooltipMessage = (cardBalance: number) => {
    if (!clientSettings) return "";
    const maxAllowedLoad =
      clientSettings.details.clientMaximumBalance - cardBalance;
    const minLoad = clientSettings.details.clientMinimumCardLoad;
    return `Load amount must be between R ${minLoad.toFixed(2)} - R ${maxAllowedLoad.toFixed(2)}`;
  };

  const getFeeForCard = (cardId: string): string => {
    const amount = amountInputs[cardId];
    if (amount === undefined || amount === null || !clientSettings) {
      return "R 0.00";
    }
    const card = cards?.find(c => c.id === cardId);
    if (card && isAmountValid(cardId, card.balance)) {
      return `R ${clientSettings.details.clientTransferFee.toFixed(2)}`;
    }
    return "R 0.00";
  };

  // amount input
  const handleAmountChange = (cardId: string, value: string) => {
    const card = getCardInfoByCardId(cardId);
    if (!clientSettings || !card) return;
    const numValue = value === "" ? null : parseFloat(value);
    updateAmountInput(cardId, numValue);

    if (numValue !== null && numValue > 0) {
      // Use smsInputs, fallback to selectedLoad
      let smsChecked = smsInputs[cardId] !== undefined
        ? smsInputs[cardId]
        : (getSelectedLoadObj(card.accountCardId)?.transferSMSNotification === 1);
      const obj: SelectedLoad = {
        accountCardId: card.accountCardId,
        transferAmount: numValue,
        transferFee: +clientSettings.details.clientTransferFee,
        transferSMSNotificationFee: smsChecked ? +clientSettings.details.clientSMSCost : 0,
        transferSMSNotification: smsChecked ? 1 : 0,
        cardholderName: card.cardholder,
        cardNumber: card.cardNumber,
      };
      addOrUpdateSelectedLoad(obj);
    } else {
      removeSelectedLoad(card.accountCardId);
    }
  };

  // SMS checkbox
  const handleSMSChange = (cardId: string, checked: boolean) => {
    updateSmsInput(cardId, checked);
    const card = getCardInfoByCardId(cardId);
    const amount = amountInputs[cardId];
    if (!card || !clientSettings || !amount || amount <= 0) return;
    const obj: SelectedLoad = {
      accountCardId: card.accountCardId,
      transferAmount: amount,
      transferFee: +clientSettings.details.clientTransferFee,
      transferSMSNotificationFee: checked ? +clientSettings.details.clientSMSCost : 0,
      transferSMSNotification: checked ? 1 : 0,
      cardholderName: card.cardholder,
      cardNumber: card.cardNumber,
    };
    addOrUpdateSelectedLoad(obj);
  };

  // Only display paginated cards
  const paginatedCards = React.useMemo(() => {
    if (!cards) return [];
    const startIndex = (page - 1) * pageSize;
    return cards.slice(startIndex, startIndex + pageSize);
  }, [cards, page, pageSize]);

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border mt-2 mb-4">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b uppercase text-left">Cardholder</th>
            <th className="py-2 px-4 border-b uppercase text-left">Card Number</th>
            <th className="py-2 px-4 border-b uppercase text-left">Amount</th>
            <th className="py-2 px-4 border-b uppercase text-left">Fee</th>
            <th className="py-2 px-4 border-b uppercase text-left">Notify via SMS</th>
          </tr>
        </thead>
        <tbody>
        {paginatedCards.map((card) => {
          const selectedLoadObj = getSelectedLoadObj(card.accountCardId);
          const amountValue = selectedLoadObj
            ? selectedLoadObj.transferAmount
            : amountInputs[card.id] ?? "";
          const smsChecked =
            (selectedLoadObj
              ? selectedLoadObj.transferSMSNotification === 1 && selectedLoadObj.transferAmount > 0
              : (smsInputs[card.id] && amountInputs[card.id] && amountInputs[card.id]! > 0) || false
            );
          return (
            <tr key={card.id ?? card.cardNumber}>
              <td className="py-2 px-4 border-b">{card.cardholder}</td>
              <td className="py-2 px-4 border-b">{card.cardNumber}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <input
                          type="number"
                          min="0"
                          className={`border rounded px-2 py-1 w-24 ${!isAmountValid(card.id, card.balance) ? 'border-paycard-red ring-1 ring-paycard-red' : ''}`}
                          value={amountValue}
                          onChange={(e) => handleAmountChange(card.id, e.target.value)}
                          placeholder="R 0.00"
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <span>
                          {getTooltipMessage(card.balance)}
                        </span>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </td>
              <td className="py-2 px-4 border-b">{getFeeForCard(card.id)}</td>
              <td className="py-2 px-4 border-b">
                <div className="flex items-center justify-center h-6">
                  <Checkbox
                    checked={smsChecked}
                    onCheckedChange={(checked: boolean) => handleSMSChange(card.id, checked)}
                    id={`sms-checkbox-${card.id}`}
                    disabled={!(amountInputs[card.id] && amountInputs[card.id]! > 0)}
                  />
                </div>
              </td>
            </tr>
          );
        })}
        </tbody>
      </table>
    </div>
  );
}
