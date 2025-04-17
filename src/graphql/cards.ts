
import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      card_number
      status
      profile_number
    }
  }
`;

export const LINK_CARDS = gql`
  mutation LinkCards($cards: [CardInsertInput!]!) {
    insertCards(objects: $cards) {
      returning {
        id
        card_number
        status
        profile_number
        processed_by
        invoice_number
      }
    }
  }
`;
