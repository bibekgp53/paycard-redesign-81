
import { create } from "zustand";

type LoadFundsToCardOption = "card-loads" | "search";
type LoadFundsFromOption = "profile" | "card";

interface LoadFundsToCardState {
  selectedLoadFundsToCard: LoadFundsToCardOption | null;
  selectedLoadFundsFrom: LoadFundsFromOption | null;
  setSelectedLoadFundsToCard: (option: LoadFundsToCardOption) => void;
  setSelectedLoadFundsFrom: (option: LoadFundsFromOption) => void;
}

export const useLoadFundsToOptionStore = create<LoadFundsToCardState>()((set) => ({
  selectedLoadFundsToCard: null,
  selectedLoadFundsFrom: null,
  setSelectedLoadFundsToCard: (option) =>
    set({ selectedLoadFundsToCard: option }),
  setSelectedLoadFundsFrom: (option) =>
    set({ selectedLoadFundsFrom: option }),
}));
