
import { create } from "zustand";

type Option = "card-loads" | "search";

interface LoadFundsToOptionState {
  selectedOption: Option | null;
  setSelectedOption: (option: Option) => void;
}

export const useLoadFundsToOptionStore = create<LoadFundsToOptionState>((set) => ({
  selectedOption: null,
  setSelectedOption: (option) => set({ selectedOption: option }),
}));
