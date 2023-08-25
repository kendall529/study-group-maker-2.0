import { useState, useEffect } from 'react'
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection'


function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <>
        <Nav />
        <main>
        <Outlet />
        </main>
    </>
  )
}

export default App
