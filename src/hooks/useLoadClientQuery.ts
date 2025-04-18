
import { useQuery } from '@apollo/client';
import { GET_LOAD_CLIENT } from '@/graphql/client';
import { ClientSettings } from '@/graphql/types';

interface LoadClientQueryVariables {
  accountFrom?: boolean;
  transferFromAccountId?: number;
}

export const useLoadClientQuery = (variables?: LoadClientQueryVariables) => {
  return useQuery<{ getloadclient: ClientSettings }, LoadClientQueryVariables>(
    GET_LOAD_CLIENT,
    { variables }
  );
};
