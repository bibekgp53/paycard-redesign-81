
import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      card_number
      status
      profile_number
      processed_by
      invoice_number
    }
  }
`;

export const LINK_CARDS = gql`
  mutation LinkCards($cards: [CardInput!]!) {
    linkCards(cards: $cards) {
      id
      card_number
      status
    }
  }
`;
