/**
 * TODO: use caicloud-apollo-client-preset or caicloud-graphql-boost instead.
 */
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

const link = new HttpLink({
  uri: `/api/graphql`,
  credentials: 'same-origin',
});

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default client;
