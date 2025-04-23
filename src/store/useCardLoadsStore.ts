import { create } from "zustand";

// Existing types...
type AmountInputs = { [key: string]: number | null };
type SMSInputs = { [key: string]: boolean };

// New type for selected loads
export interface SelectedLoad {
  accountCardId: number;
  transferAmount: number;
  transferFee: number;
  transferSMSNotificationFee: number;
  transferSMSNotification: 0 | 1;
}

interface CardLoadsState {
  amountInputs: AmountInputs;
  smsInputs: SMSInputs;
  effectiveDate: 0 | 1;
  selectedDate?: Date;
  page: number;
  // New core: Array of selected loads
  selectedLoads: SelectedLoad[];
  setAmountInputs: (inputs: AmountInputs) => void;
  setSmsInputs: (inputs: SMSInputs) => void;
  setEffectiveDate: (date: 0 | 1) => void;
  setSelectedDate: (date?: Date) => void;
  setPage: (page: number) => void;
  resetCardLoadsState: () => void;
  // Utility to update one field at a time
  updateAmountInput: (cardId: string, value: number | null) => void;
  updateSmsInput: (cardId: string, value: boolean) => void;

  // New for array
  setSelectedLoads: (loads: SelectedLoad[]) => void;
  addOrUpdateSelectedLoad: (load: SelectedLoad) => void;
  removeSelectedLoad: (accountCardId: number) => void;
  clearSelectedLoads: () => void;
}

// Defaults: blank state
export const useCardLoadsStore = create<CardLoadsState>((set, get) => ({
  amountInputs: {},
  smsInputs: {},
  effectiveDate: 0,
  selectedDate: new Date(),
  page: 1,
  selectedLoads: [],
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
      selectedLoads: [],
    }),
  updateAmountInput: (cardId, value) =>
    set((state) => ({
      amountInputs: { ...state.amountInputs, [cardId]: value },
    })),
  updateSmsInput: (cardId, value) =>
    set((state) => ({
      smsInputs: { ...state.smsInputs, [cardId]: value },
    })),
  setSelectedLoads: (loads) => set({ selectedLoads: loads }),
  addOrUpdateSelectedLoad: (load) => set((state) => {
    const idx = state.selectedLoads.findIndex(l => l.accountCardId === load.accountCardId);
    if (idx === -1) return { selectedLoads: [...state.selectedLoads, load] };
    // Update
    const arr = [...state.selectedLoads];
    arr[idx] = load;
    return { selectedLoads: arr };
  }),
  removeSelectedLoad: (accountCardId) =>
    set((state) => ({
      selectedLoads: state.selectedLoads.filter(l => l.accountCardId !== accountCardId)
    })),
  clearSelectedLoads: () => set({ selectedLoads: [] }),
}));
