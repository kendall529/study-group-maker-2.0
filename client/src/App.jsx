import { useEffect } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Nav from './components/NavTabs';
import Home from './pages/Home';  // Import your page components
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Profile from './pages/Profile';
import Signup from './pages/Signup';
import Groups from './pages/Groups';
import Contact from './pages/Contact';
import Error from './pages/Error';
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection';

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
});


function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

    return (
        <ApolloProvider client={client}>
          <BrowserRouter>
            <div>
              <a href="/">Study Group Maker</a>
              <Nav />
              <Routes>
                <Route index element={<Home />} />
                <Route path="/Groups" element={<Groups />} />
                <Route path="/Contact" element={<Contact />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Profile/:_id" element={<Profile />} />
                <Route path="/SignUp" element={<Signup />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                <Route path="*" element={<Error />} /> {/* Catch-all route */}
              </Routes>
            </div>
          </BrowserRouter>
        </ApolloProvider>
    );
  }
  
  export default App;
