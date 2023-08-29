import { useState, useEffect } from 'react'
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection'
import React from 'react';
import {
  BrowserRouter as Router, Link, useLocation, Outlet
} from 'react-router-dom';
import Nav from './components/NavTabs';

function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <Router>
        <navbar>
        <a id="logo" class="" href="/">Study Group Maker</a>
          <Nav />
        </navbar>

        <main>
        <Outlet />
        </main>
    </Router>
  )
}

export default App
