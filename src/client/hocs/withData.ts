import withApollo from 'next-with-apollo';
import fetch from 'isomorphic-unfetch';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { split } from 'apollo-link';
import { getMainDefinition } from 'apollo-utilities';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import { getProtocol } from '@/utils';

// Update the GraphQL endpoint to any instance of GraphQL that you like
const GRAPHQL_ENDPOINT = `${getProtocol('http')}://${
  process.env.HOST_NAME
}/graphql`;

function createLink() {
  const isSSR = !process.browser;

  const httpLink = createHttpLink({
    fetch, // Switches between unfetch & node-fetch for client & server.
    uri: GRAPHQL_ENDPOINT,
  });

  if (isSSR) {
    return httpLink;
  } else {
    const SUBSCRIPTIONS_ENDPOINT = `${getProtocol('ws')}://${
      process.env.HOST_NAME
    }/graphql`;
    const client = new SubscriptionClient(SUBSCRIPTIONS_ENDPOINT, {
      reconnect: true,
    });
    const wsLink = new WebSocketLink(client);

    return split(
      // split based on operation type
      ({ query }) => {
        const definition = getMainDefinition(query);
        return (
          definition.kind === 'OperationDefinition' &&
          definition.operation === 'subscription'
        );
      },
      wsLink,
      httpLink,
    );
  }
}

// Export a HOC from next-with-apollo
// Docs: https://www.npmjs.com/package/next-with-apollo
export default withApollo(
  // You can get headers and ctx (context) from the callback params
  // e.g. ({ headers, ctx, initialState })
  ({ initialState }) =>
    new ApolloClient({
      link: createLink(),
      cache: new InMemoryCache()
        //  rehydrate the cache using the initial data passed from the server:
        .restore(initialState || {}),
    }),
);
