
import { useCardLoadsStore, SelectedLoad } from "@/store/useCardLoadsStore";
import { Checkbox } from "@/components/ui/checkbox";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
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
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Cardholder</TableHead>
            <TableHead>Card Number</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Fee</TableHead>
            <TableHead>Notify via SMS</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
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
            const showAmountError =
              !isAmountValid(card.id, card.balance) &&
              amountInputs[card.id] !== undefined &&
              amountInputs[card.id] !== null;

            return (
              <TableRow key={card.id ?? card.cardNumber}>
                <TableCell>{card.cardholder}</TableCell>
                <TableCell>{card.cardNumber}</TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Input
                            type="number"
                            min="0"
                            className="w-24"
                            value={amountValue}
                            onChange={(e) => handleAmountChange(card.id, e.target.value)}
                            placeholder="R 0.00"
                            error={showAmountError}
                          />
                        </TooltipTrigger>
                        <TooltipContent>
                          <span>{getTooltipMessage(card.balance)}</span>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </TableCell>
                <TableCell>{getFeeForCard(card.id)}</TableCell>
                <TableCell>
                  <div className="flex items-center justify-center h-6">
                    <Checkbox
                      checked={smsChecked}
                      onCheckedChange={(checked: boolean) => handleSMSChange(card.id, checked)}
                      id={`sms-checkbox-${card.id}`}
                      disabled={!(amountInputs[card.id] && amountInputs[card.id]! > 0)}
                    />
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
