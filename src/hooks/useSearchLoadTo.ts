
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export type SearchField = 'cardNumber' | 'cardholder' | 'idPassportNumber' | 'expiryDate' | 'referenceNumber';

interface SearchParams {
  searchField: SearchField;
  searchString: string;
  orderByField: SearchField;
  offset: number;
  limit: number;
}

export interface SearchResult {
  account_card_id: number;
  cardholder: string;
  cardnumber: string;
  id_passport_number: string | null;
  expiry_date: string | null;
  reference_number: string | null;
}

export const useSearchLoadTo = () => {
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const searchCards = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: rpcError } = await supabase
        .rpc('search_load_to', {
          p_search_field: params.searchField,
          p_search_string: params.searchString,
          p_order_by_field: params.orderByField,
          p_offset: params.offset,
          p_limit: params.limit
        });

      if (rpcError) throw rpcError;
      setResults(data || []);
    } catch (err) {
      console.error('Error searching cards:', err);
      setError('Failed to search cards');
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, error, searchCards };
};
