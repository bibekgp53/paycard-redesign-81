import { gql } from '@apollo/client';
import { maskCardNumber } from './utils';

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
  mutation LinkCards($cards: [cards_insert_input!]!) {
    insert_cards(objects: $cards) {
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

export const processCardResponse = (card: { card_number: string }) => {
  return {
    ...card,
    card_number: maskCardNumber(card.card_number)
  };
};
