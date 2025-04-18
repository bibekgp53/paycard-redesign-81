
import { gql } from '@apollo/client';

export const GET_CLIENT_SETTINGS = gql`
  query get_client_settings {
    clientSettings: client_settings {
      client_min_card_load
      client_max_balance
      client_transfer_fee
    }
  }
`;
