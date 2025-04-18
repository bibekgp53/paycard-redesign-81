
import { gql } from '@apollo/client';

export const GET_USER_HEADER = gql`
  query GetUserHeader {
    userHeader {
      balanceAccount
      accountNumber
      fullName
    }
  }
`;
