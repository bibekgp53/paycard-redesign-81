
import { useQuery } from '@apollo/client';
import { GET_CLIENT_SETTINGS } from '@/graphql/client';

interface ClientSettings {
  clientSettings: {
    client_min_card_load: number;
    client_max_balance: number;
    client_transfer_fee: number;
  }[];
}

export const useLoadClientQuery = () => {
  return useQuery<ClientSettings>(GET_CLIENT_SETTINGS);
};
