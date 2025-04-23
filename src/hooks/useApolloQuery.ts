
import { DocumentNode, TypedDocumentNode, QueryHookOptions, useQuery } from '@apollo/client';

export function useApolloQuery<TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  const { data, loading, error, refetch, networkStatus } = useQuery<TData, TVariables>(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: options?.fetchPolicy || 'network-only', // Default to network-only to avoid cache issues
    onError: (error) => {
      console.error('GraphQL query error:', error);
      
      // Let the component handle error display using Alert component instead of toast
      if (options?.onError) {
        options.onError(error);
      }
    }
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
