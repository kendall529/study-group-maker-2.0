import { useState, useEffect } from 'react'
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection'
import React from 'react';
import {
  BrowserRouter as Router, Link, useLocation
} from 'react-router-dom';


function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <Router>
        <Nav />
        <main>
        <Outlet />
        </main>
    </Router>
  )
}

export default App
