import '@babel/polyfill'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './component/app'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'
import { BrowserRouter } from 'react-router-dom'
import { AUTH_TOKEN } from './constants'
import { HttpLink } from 'apollo-link-http'

const env = process.env.NODE_ENV

if (env === 'development') {
  module.hot.addStatusHandler(status => {
    if (status === 'apply') {
      console.log('HMR reloads')
    }
  })
}

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem(AUTH_TOKEN)
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
    }
  }
})

const httpLink = new HttpLink({
  uri: env === 'development' ? 'http://localhost:4000' : 'https://api.drop.run'
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </ApolloProvider>
  , document.getElementById('root'))
