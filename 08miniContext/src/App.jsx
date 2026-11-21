import { useState } from 'react'
import './App.css'
import UserContextProvider from './context/UserContextProvider'

function App() {
  const [count, setCount] = useState(0)

  return (
    <UserContextProvider>
      <h1>React with Chai aur share is important</h1>
      <Login/>
      <Profile/>
      
    </UserContextProvider>
  )
}

export default App
