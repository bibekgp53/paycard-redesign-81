
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from, ApolloLink } from '@apollo/client';
import { supabase } from '../integrations/supabase/client';

// Create the http link with the Supabase GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://osopwbxyzmcdymudhtyh.supabase.co/graphql/v1',
  credentials: 'same-origin'
});

// Create a middleware link to add auth headers
const authMiddleware = new ApolloLink(async (operation, forward) => {
  // Get the session token from Supabase
  const { data: { session } } = await supabase.auth.getSession();
  const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw';
  
  // Create headers object
  const headers = {
    apikey: apikey,
    authorization: session ? `Bearer ${session.access_token}` : `Bearer ${apikey}`,
    'Content-Type': 'application/json',
  };
  
  console.log('Apollo GraphQL Headers:', headers);
  console.log('Authentication status:', session ? 'Authenticated' : 'Anonymous');
  
  operation.setContext({
    headers
  });

  return forward(operation);
});

// Better error and logging link
const loggingLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`, { 
    variables: operation.variables,
    query: operation.query.loc?.source.body
  });
  
  return forward(operation).map(response => {
    console.log(`GraphQL Response: ${operation.operationName}`, { 
      data: response.data,
      errors: response.errors 
    });
    return response;
  });
});

export const apolloClient = new ApolloClient({
  link: from([loggingLink, authMiddleware, httpLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          profilesCollection: {
            merge(existing, incoming) {
              return incoming;
            }
          }
        }
      }
    }
  }),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
