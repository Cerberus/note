import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import { ApolloLink } from 'apollo-link'
import WebSocketLink from 'apollo-link-ws'
import Link from 'apollo-link-http'
import Cache from 'apollo-cache-inmemory'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const hasSubscriptionOperation = ({ query: { definitions } }) =>
  definitions.some(
    ({ kind, operation }) =>
      kind === 'OperationDefinition' && operation === 'subscription',
  )

const link = ApolloLink.split(
  hasSubscriptionOperation,
  new WebSocketLink({
    uri: 'wss://subscriptions.graph.cool/v1/__path__',
    options: { reconnect: true },
  }),
  new Link({
    uri: 'https://api.graph.cool/simple/v1/__path__',
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
