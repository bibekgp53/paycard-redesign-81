
import { gql } from '@apollo/client';

export const GET_CARDS = gql`
  query GetCards {
    cards {
      id
      card_number
      status
      processed_by
      tracking_number
    }
  }
`;

// mutation to insert into card_links, not cards
export const LINK_CARD_LINKS = gql`
  mutation LinkCardLinks($objects: [card_links_insert_input!]!) {
    insert_card_links(objects: $objects) {
      returning {
        id
        card_id
        profile_number
        processed_by
        invoice_number
        created_at
        updated_at
      }
    }
  }
`;
