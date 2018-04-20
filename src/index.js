import { ApolloClient } from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import { ApolloProvider } from 'react-apollo'
import { SubscriptionClient } from 'subscriptions-transport-ws'
import { WebSocketLink } from 'apollo-link-ws'
import { createHttpLink } from 'apollo-link-http'
import Cache from 'apollo-cache-inmemory'
import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import registerServiceWorker from './registerServiceWorker'

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription',
  )

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink(
    new SubscriptionClient(process.env.REACT_APP_WEB_SOCKET_URL, {
      reconnect: true,
    }),
  ),
  createHttpLink({
    uri: process.env.REACT_APP_API_URL,
  }),
)

const client = new ApolloClient({
  link,
  cache: new Cache(window.__APOLLO_STATE__),
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root'),
)
registerServiceWorker()

if (module.hot) {
  module.hot.accept()
}
