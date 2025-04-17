
import { DocumentNode, MutationHookOptions, TypedDocumentNode, useMutation } from '@apollo/client';

export function useApolloMutation<TData = any, TVariables = any>(
  mutation: DocumentNode | TypedDocumentNode<TData, TVariables>,
  options?: MutationHookOptions<TData, TVariables>
) {
  const [mutateFunction, { data, loading, error }] = useMutation<TData, TVariables>(
    mutation,
    options
  );

  return {
    mutate: mutateFunction,
    data,
    loading,
    error,
    isError: !!error,
  };
}
