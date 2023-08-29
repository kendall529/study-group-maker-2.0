import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Provider } from 'react-redux';
import store from './store/store.js';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import Contact from './pages/Contact';
import Groups from './pages/Groups';
import Home from './pages/Home';
import Login from './pages/Login';
import Profile from './pages/Profile';
import SignUp from './pages/SignUp';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
        path: '/Profile',
        element: <Profile/>,
      },
      {
        path: '/SignUp',
        element: <SignUp/>
      }
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);
