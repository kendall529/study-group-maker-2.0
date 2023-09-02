import { useState, useEffect } from 'react'
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection'
import React from 'react';
import { Provider } from 'react-redux';
import store from './store/store';
import {
  BrowserRouter as Router, Link, useLocation, Outlet
} from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/NavTabs';

const httpLink = createHttpLink({
  uri: '/graphql',
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});


const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  uri: 'http://localhost:3001/graphql',
});


function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (

    <Provider store={store}>
        <ApolloProvider client={client}>
              <div>
                <a href="/">Study Group Maker</a>
                <Nav />

                <main>  
                  <Outlet />
                </main>
              </div>
        </ApolloProvider>
    </Provider>


  )
}



export default App
