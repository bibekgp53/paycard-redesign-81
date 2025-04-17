
import { gql } from '@apollo/client';

export const GET_PROFILES = gql`
  query GetProfiles {
    profiles {
      id
      profile_number
      name
      business_name
    }
  }
`;
