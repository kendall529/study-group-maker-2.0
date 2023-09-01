import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Contact from './pages/Contact';
import Groups from './pages/Groups';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/Signup';
import Error from './pages/Error';
import Dashboard from './pages/Dashboard';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/Groups',
        element: <Groups />,
      },
      {
        path: '/Contact',
        element: <Contact />,
      },
      {
        path: '/Login',
        element: <Login />,
      },
      {
        path: '/Profile/:_id',
        element: <Profile/>,
      },
      {
        path: '/SignUp',
        element: <SignUp/>
      },
      {
        path: '/Dashboard',
        element: <Dashboard/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
