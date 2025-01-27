import { useState } from 'react'
import './App.css'
import Home from './components/Home'
import LoginPage from './components/Login'
import Login from './components/Login'
import SignUp from './components/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
       <Home></Home>
       {/* <SignUp></SignUp> */}
       {/* <LoginPage></LoginPage> */}
        
    </>
  )
}

export default App
