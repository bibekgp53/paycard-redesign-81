
import { gql } from '@apollo/client';

export const GET_LOAD_CLIENT = gql`
  query GetLoadClient {
    get_load_client {
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
