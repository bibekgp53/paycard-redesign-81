
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
      // Adding storage configuration to ensure proper persistence
      storage: {
        getItem: (name) => {
          try {
            const value = localStorage.getItem(name);
            return value ? JSON.parse(value) : null;
          } catch (error) {
            console.warn(`Error reading from localStorage:`, error);
            return null;
          }
        },
        setItem: (name, value) => {
          try {
            localStorage.setItem(name, JSON.stringify(value));
          } catch (error) {
            console.warn(`Error writing to localStorage:`, error);
          }
        },
        removeItem: (name) => {
          try {
            localStorage.removeItem(name);
          } catch (error) {
            console.warn(`Error removing from localStorage:`, error);
          }
        },
      },
    }
  )
);
