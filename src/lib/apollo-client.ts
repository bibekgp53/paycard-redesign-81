
import { ApolloClient, InMemoryCache, createHttpLink, HttpLink, from, ApolloLink } from '@apollo/client';
import { supabase } from '../integrations/supabase/client';

// Create the http link with the Supabase GraphQL endpoint
const httpLink = new HttpLink({
  uri: 'https://osopwbxyzmcdymudhtyh.supabase.co/graphql/v1',
  // Important: Don't use credentials: 'include' which causes CORS issues
  // with the '*' Access-Control-Allow-Origin response
  credentials: 'same-origin'
});

// Create a middleware link to add auth headers
const authMiddleware = new ApolloLink((operation, forward) => {
  // Add the API key to all operations
  operation.setContext(({ headers = {} }) => {
    const apikey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw';
    
    // Log the headers being sent for debugging
    console.log('Apollo GraphQL Headers:', {
      ...headers,
      apikey: apikey,
      authorization: `Bearer ${apikey}`,
      'Content-Type': 'application/json',
    });
    
    return {
      headers: {
        ...headers,
        apikey: apikey,
        authorization: `Bearer ${apikey}`,
        'Content-Type': 'application/json',
      }
    };
  });

  return forward(operation);
});

// Better error and logging link
const loggingLink = new ApolloLink((operation, forward) => {
  console.log(`GraphQL Request: ${operation.operationName}`, { 
    variables: operation.variables 
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
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
  },
});
