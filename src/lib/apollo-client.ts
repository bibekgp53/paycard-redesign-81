
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from, ApolloLink } from '@apollo/client';
import { supabase } from '../integrations/supabase/client';

// Create the http link with the Supabase GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'https://osopwbxyzmcdymudhtyh.supabase.co/graphql/v1',
  credentials: 'include'
});

// Create a middleware link to add auth headers
const authMiddleware = new ApolloLink((operation, forward) => {
  // Add the API key to all operations
  operation.setContext(({ headers = {} }) => {
    const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw';
    
    return {
      headers: {
        ...headers,
        apikey: apikey,
        authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
        'Accept': '*/*'
      }
    };
  });

  return forward(operation);
});

// Error handling link
const errorLink = new ApolloLink((operation, forward) => {
  return forward(operation).map(response => {
    if (response.errors) {
      console.error('GraphQL Response Errors:', response.errors);
    }
    return response;
  });
});

export const apolloClient = new ApolloClient({
  link: from([errorLink, authMiddleware, httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
