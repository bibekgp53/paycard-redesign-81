
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { supabase } from '../integrations/supabase/client';

// Create the http link with the Supabase GraphQL endpoint
const httpLink = createHttpLink({
  uri: 'https://osopwbxyzmcdymudhtyh.supabase.co/graphql/v1',
  headers: {
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw',
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9zb3B3Ynh5em1jZHltdWRodHloIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ5MjI2NzAsImV4cCI6MjA2MDQ5ODY3MH0._49Jlg6STEqs2BevV4n1FFag3VW1xMOFT4nO0Fn3SCw`
  }
});

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache({
    addTypename: false, // This can help with some query issues
    typePolicies: {
      Query: {
        fields: {
          profiles: {
            merge: false // Don't merge results, replace them
          }
        }
      }
    }
  }),
});
