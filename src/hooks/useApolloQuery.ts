
import { DocumentNode, TypedDocumentNode, QueryHookOptions, useQuery } from '@apollo/client';

export function useApolloQuery<TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  const { data, loading, error, refetch } = useQuery<TData, TVariables>(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
  });

  return {
    data,
    loading,
    error,
    refetch,
    isError: !!error,
  };
}

