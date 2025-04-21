
export interface Card {
  id: string;
  card_number: string;
  status: 'inactive' | 'active' | 'suspended' | 'linked';
  processed_by?: string;
  tracking_number?: string | null;
  // removed profile_number and invoice_number as per db change
}

export interface CardLink {
  id: string;
  card_id: string;
  profile_number: string;
  invoice_number?: string;
  processed_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CardInput {
  card_number: string;
  processed_by: string;
  status: string;
}

export interface CardLinkInput {
  card_id: string;
  profile_number: string;
  invoice_number?: string;
  processed_by?: string;
}

export interface GetCardsData {
  cards: Card[];
}

export interface Profile {
  id: string;
  profile_number: string;
  name?: string | null;
  business_name?: string | null;
}

export interface GetProfilesData {
  profilesCollection: {
    edges: Array<{
      node: Profile;
    }>;
  };
}

export interface LinkCardsData {
  insert_card_links: {
    returning: CardLink[];
  };
}

export interface LinkCardsVariables {
  objects: CardLinkInput[];
}

export interface UserHeader {
  balanceAccount: number;
  accountNumber: number;
  fullName: string;
}

export interface ClientSettings {
  details: {
    clientMinCardLoad: number;
    clientMaxBalance: number;
    clientTransferFee: number;
    clientSMSCost: number; // Added
    // Add other values as they are added in get_load_client
    transferSMSNotificationFee?: number; // Will mirror clientSMSCost for the UI
  };
  profile: {
    fromBalance: number;
    fromAccount: number;
  };
}

export interface GetLoadClientData {
  loadClient: ClientSettings;
}

// Adding the AccountCard interface that was missing
export interface AccountCard {
  id: string;
  accountCardId: number;
  accountCardMtd: number;
  balance: number;
  cardholder: string;
  cardNumber: string;  // This will now contain the masked number
  ficaValidation: string;
}

