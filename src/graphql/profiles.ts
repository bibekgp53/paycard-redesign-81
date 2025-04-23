
import { gql } from '@apollo/client';

export const GET_PROFILES = gql`
  query GetProfiles {
    profilesCollection {
      edges {
        node {
          id
          profile_number
          name
          business_name
          email
          phone
          from_account
          from_balance
        }
      }
    }
  }
`;

// Add a more direct query for troubleshooting
export const GET_PROFILES_DIRECT = gql`
  query GetProfilesDirect {
    profiles {
      id
      profile_number
      name
      business_name
      email
      phone
      from_account
      from_balance
    }
  }
`;
