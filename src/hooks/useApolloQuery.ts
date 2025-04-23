
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
      if (data && typeof data === 'object' && 'profilesCollection' in data) {
        const profilesData = data as any;
        if (profilesData.profilesCollection?.edges?.length === 0) {
          console.warn('No profiles found in database. Check if profiles table has data or if RLS policies are preventing access.');
        } else {
          console.log('Profiles found:', profilesData.profilesCollection.edges.length);
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
        
        // Look for specific error messages
        const jwtError = error.graphQLErrors.some(e => e.message.includes('JWT'));
        const permissionError = error.graphQLErrors.some(e => 
          e.message.includes('permission') || e.message.includes('access') || e.message.includes('not allowed')
        );
        
        if (jwtError) {
          toast({
            title: "Authentication Error",
            description: "Your session has expired. Please log in again.",
            variant: "destructive",
          });
        } else if (permissionError) {
          toast({
            title: "Permission Error",
            description: "You don't have permission to access this data. Check RLS policies.",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Error",
            description: `Failed to load data: ${error.message}`,
            variant: "destructive",
          });
        }
      }
      
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
