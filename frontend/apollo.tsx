import React from 'react';
import { ApolloProvider } from '@apollo/react-hooks';
import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import fetch from 'node-fetch';

export function withApollo(PageComponent) {
  const WithApollo = ({apolloClient, apolloState, ...pageProps}) => {
    const client = createApolloClient();
    return (
      <ApolloProvider client={client}>
        <PageComponent {...pageProps} />
      </ApolloProvider>
    )
  }
  
  // if (process.env.NODE_ENV !== 'production') {
  //   const displayName = PageComponent.displayName || PageComponent.name || 'Component';

  //   if (displayName === 'App') {
  //     console.warn('This withApollo HOC only works with PageComponents');
  //   }

  //   WithApollo.displayName = `withApollo(${displayName})`;
  // }

  return WithApollo;
}

function createApolloClient () {
  return new ApolloClient({
    link: new HttpLink({
      uri: 'http://localhost:3000/graphql',
      fetch
    }),
    cache: new InMemoryCache()
  })
}