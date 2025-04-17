
export interface Card {
  id: string;
  card_number: string;
  status: 'inactive' | 'active' | 'suspended' | 'linked';
  profile_number?: string;
  processed_by?: string;
  invoice_number?: string;
}

export interface CardInput {
  card_number: string;
  profile_number: string;
  processed_by: string;
  invoice_number: string;
}

export interface GetCardsData {
  cards: Card[];
}

export interface LinkCardsData {
  linkCards: Card[];
}

export interface LinkCardsVariables {
  cards: CardInput[];
}
