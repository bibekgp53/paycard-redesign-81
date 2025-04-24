
import { create } from "zustand";

interface SelectedCardsState {
  selectedCardIds: number[];
  isFromSearch: boolean;
  setSelectedCardIds: (cardIds: number[]) => void;
  setIsFromSearch: (isFromSearch: boolean) => void;
  clearSelectedCards: () => void;
}

export const useSelectedCardsStore = create<SelectedCardsState>((set) => ({
  selectedCardIds: [],
  isFromSearch: false,
  setSelectedCardIds: (cardIds) => set({ selectedCardIds: cardIds }),
  setIsFromSearch: (isFromSearch) => set({ isFromSearch }),
  clearSelectedCards: () => set({ selectedCardIds: [], isFromSearch: false }),
}));
