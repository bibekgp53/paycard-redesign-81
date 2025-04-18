
import { useQuery } from '@apollo/client';
import { GET_LOAD_CLIENT } from '@/graphql/client';
import { ClientSettings } from '@/graphql/types';

interface LoadClientQueryVariables {
  account_from?: boolean;
  transferFromAccountId?: number;
}

export const useLoadClientQuery = (variables?: LoadClientQueryVariables) => {
  return useQuery<{ get_load_client: ClientSettings }, LoadClientQueryVariables>(
    GET_LOAD_CLIENT,
    { variables }
  );
};
