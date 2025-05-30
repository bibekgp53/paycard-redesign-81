
import { ApolloClient, InMemoryCache, createHttpLink, ApolloLink, from } from '@apollo/client';
import { supabase } from '../integrations/supabase/client';

// Create the http link with the Supabase GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'https://osopwbxyzmcdymudhtyh.supabase.co/graphql/v1',
  // Remove credentials: 'include' as it's causing CORS issues
  fetchOptions: {
    mode: 'cors'
  }
});

// Create a middleware link to add auth headers
const authMiddleware = new ApolloLink((operation, forward) => {
  // Add the API key to all operations
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw';
  
  // Set the API key in the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      apikey: apikey,
      // Set authorization header with API key instead of using credentials
      authorization: `Bearer ${apikey}`
    }
  }));

  return forward(operation);
});

export const apolloClient = new ApolloClient({
  link: from([authMiddleware, httpLink]),
  cache: new InMemoryCache(),
});
