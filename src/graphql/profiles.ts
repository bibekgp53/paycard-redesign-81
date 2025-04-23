
import { gql } from '@apollo/client';

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles(order_by: {business_name: asc}) {
      id
      profile_number
      name
      business_name
    }
  }
`;
