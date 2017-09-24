import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloProvider } from 'react-apollo'
import ApolloClient from 'apollo-client'
import Link from 'apollo-link-http'
import Cache from 'apollo-cache-inmemory'
import App from './App'
import registerServiceWorker from './registerServiceWorker'

const client = new ApolloClient({
  link: new Link({
    uri: 'https://api.graph.cool/simple/v1/__path__',
  }),
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
