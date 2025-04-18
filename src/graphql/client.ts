
import { gql } from '@apollo/client';

export const GET_LOAD_CLIENT = gql`
  query GetLoadClient($accountFrom: Boolean, $transferFromAccountId: Int) {
    get_load_client(account_from: $accountFrom, transfer_from_account_id: $transferFromAccountId) {
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
