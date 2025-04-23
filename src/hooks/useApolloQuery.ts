
import { DocumentNode, TypedDocumentNode, QueryHookOptions, useQuery } from '@apollo/client';

export function useApolloQuery<TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'network-only', // Force fetch from network instead of cache
    errorPolicy: 'all', // Return partial results if available
  });

  // Log errors to help with debugging
  if (error) {
    console.error('Apollo query error:', error);
  }

  return {
    data,
    loading,
    error,
    refetch,
    isError: !!error,
  };
}
