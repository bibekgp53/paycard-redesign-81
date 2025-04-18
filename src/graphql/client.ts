
import { gql } from '@apollo/client';

export const GET_LOAD_CLIENT = gql`
  query get_load_client($account_from: Boolean, $transferFromAccountId: Int) {
    get_load_client(account_from: $account_from, transfer_from_account_id: $transferFromAccountId) {
      details {
        clientMinCardLoad
        clientMaxBalance
        clientTransferFee
      }
      profile {
        fromBalance
        fromAccount
      }
    }
  }
`;
