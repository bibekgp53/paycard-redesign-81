
import { useQuery } from '@apollo/client';
import { GET_LOAD_CLIENT } from '@/graphql/client';
import { ClientSettings } from '@/graphql/types';

export const useLoadClientQuery = () => {
  return useQuery<{ get_load_client: ClientSettings }>(GET_LOAD_CLIENT);
};
