
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
  // Added new fields from database update
  from_account?: string | null;
  from_balance?: number | null;
}

export interface GetProfilesData {
  profilesCollection: {
    edges: Array<{
      node: {
        id: string;
        profile_number: string;
        name: string | null;
        business_name: string | null;
        from_account?: string | null;
        from_balance?: number | null;
      }
    }>
  }
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

// Previous interfaces replaced/updated for new backend response shape

export interface ClientProfile {
  fromAccount: string;
  fromBalance: number;
}

export interface ClientDetails {
  clientTerminalID: string;
  clientMaximumBalance: number;
  clientMerchantTransfers: string;
  clientMerchantNumber: string;
  clientTransferFee: number;
  clientSMSCost: number;
  clientMinimumCardLoad: number;
  previousTransfers: number;
  clientAllowsSMSNotifications: boolean;
  clientMaximumMTD: number;
}

export interface ClientSettings {
  profile: ClientProfile;
  details: ClientDetails;
  effectiveStopDate: string;
  rebate: unknown[]; // Currently always array, adjust if needed in the future
  transferUUID: string;
  effectiveDate: string;
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
