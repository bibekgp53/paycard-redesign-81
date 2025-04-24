
import { create } from "zustand";
import { persist } from "zustand/middleware";

type LoadFundsToCardOption = "card-loads" | "search";

interface LoadFundsToCardState {
  selectedLoadFundsToCard: LoadFundsToCardOption | null;
  setSelectedLoadFundsToCard: (option: LoadFundsToCardOption) => void;
}

export const useLoadFundsToOptionStore = create<LoadFundsToCardState>()(
  persist(
    (set) => ({
      selectedLoadFundsToCard: null,
      setSelectedLoadFundsToCard: (option) =>
        set({ selectedLoadFundsToCard: option }),
    }),
    {
      name: "load-funds-options",
    }
  )
);
