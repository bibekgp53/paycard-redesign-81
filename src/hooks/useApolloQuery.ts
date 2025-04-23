
import { DocumentNode, TypedDocumentNode, QueryHookOptions, useQuery } from '@apollo/client';

export function useApolloQuery<TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  const { data, loading, error, refetch, networkStatus } = useQuery<TData, TVariables>(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: options?.fetchPolicy || 'network-only', // Default to network-only to avoid cache issues
  });

  return {
    data,
    loading,
    error,
    refetch,
    isError: !!error,
    networkStatus,
  };
}
