
import { create } from "zustand";

type AmountInputs = { [key: string]: number | null };
type SMSInputs = { [key: string]: boolean };

interface CardLoadsState {
  amountInputs: AmountInputs;
  smsInputs: SMSInputs;
  effectiveDate: 0 | 1;
  selectedDate?: Date;
  page: number;
  setAmountInputs: (inputs: AmountInputs) => void;
  setSmsInputs: (inputs: SMSInputs) => void;
  setEffectiveDate: (date: 0 | 1) => void;
  setSelectedDate: (date?: Date) => void;
  setPage: (page: number) => void;
  resetCardLoadsState: () => void;
  // Utility to update one field at a time
  updateAmountInput: (cardId: string, value: number | null) => void;
  updateSmsInput: (cardId: string, value: boolean) => void;
}

// Defaults: blank state with immediately/now as default
export const useCardLoadsStore = create<CardLoadsState>((set) => ({
  amountInputs: {},
  smsInputs: {},
  effectiveDate: 0,
  selectedDate: new Date(),
  page: 1,
  setAmountInputs: (inputs) => set({ amountInputs: inputs }),
  setSmsInputs: (inputs) => set({ smsInputs: inputs }),
  setEffectiveDate: (date) => set({ effectiveDate: date }),
  setSelectedDate: (date) => set({ selectedDate: date }),
  setPage: (page) => set({ page }),
  resetCardLoadsState: () =>
    set({
      amountInputs: {},
      smsInputs: {},
      effectiveDate: 0,
      selectedDate: new Date(),
      page: 1,
    }),
  updateAmountInput: (cardId, value) =>
    set((state) => ({
      amountInputs: { ...state.amountInputs, [cardId]: value },
    })),
  updateSmsInput: (cardId, value) =>
    set((state) => ({
      smsInputs: { ...state.smsInputs, [cardId]: value },
    })),
}));
