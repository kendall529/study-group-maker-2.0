import { useState, useEffect } from 'react'
import { connectWithWebSocket } from './utils/webSockConnection/webSockConnection'


function App() {

  useEffect(() => {
    connectWithWebSocket();
  }, []);

  return (
    <>
      <h1>Hello, this a react app check</h1>
    </>
  )
}

export default App
