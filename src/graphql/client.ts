
import { gql } from '@apollo/client';

export const GET_LOAD_CLIENT = gql`
  query GetLoadClient {
    getLoadClient {
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
