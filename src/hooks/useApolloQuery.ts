
import { DocumentNode, TypedDocumentNode, QueryHookOptions, useQuery } from '@apollo/client';
import { toast } from '@/hooks/use-toast';

export function useApolloQuery<TData = any, TVariables = any>(
  query: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: QueryHookOptions<TData, TVariables>
) {
  const { data, loading, error, refetch, networkStatus } = useQuery<TData, TVariables>(query, {
    ...options,
    notifyOnNetworkStatusChange: true,
    fetchPolicy: options?.fetchPolicy || 'network-only', // Default to network-only to avoid cache issues
    errorPolicy: 'all', // Handle all errors to prevent crashes
    onCompleted: (data) => {
      console.log('Query completed successfully:', data);
      
      // Check if profiles data came back empty
      if (data && 'profilesCollection' in data) {
        const profilesData = data as any;
        if (profilesData.profilesCollection?.edges?.length === 0) {
          console.warn('No profiles found in database. Check if profiles table has data.');
        }
      }
      
      if (options?.onCompleted) {
        options.onCompleted(data);
      }
    },
    onError: (error) => {
      console.error('GraphQL query error:', error);
      
      if (error.networkError) {
        console.error('Network error details:', error.networkError);
        toast({
          title: "Network Error",
          description: "Failed to connect to the server. Please check your connection.",
          variant: "destructive",
        });
      } else if (error.graphQLErrors?.length) {
        console.error('GraphQL errors:', error.graphQLErrors);
        if (error.message.includes('JWT')) {
          toast({
            title: "Authentication Error",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to load data: ${error.message}`,
            variant: "destructive",
          });
        }
      } else if (options?.onError) {
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
