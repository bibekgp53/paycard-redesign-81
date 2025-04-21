
import { create } from "zustand";

type LoadFundsToCardOption = "card-loads" | "search";

interface LoadFundsToCardState {
  selectedLoadFundsToCard: LoadFundsToCardOption | null;
  setSelectedLoadFundsToCard: (option: LoadFundsToCardOption) => void;
}

export const useLoadFundsToOptionStore = create<LoadFundsToCardState>((set) => ({
  selectedLoadFundsToCard: null,
  setSelectedLoadFundsToCard: (option) =>
    set({ selectedLoadFundsToCard: option }),
}));
