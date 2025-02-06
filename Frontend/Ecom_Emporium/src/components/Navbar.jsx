import React from 'react'
import { Link } from 'react-router-dom'
import "./Navbar.css"

const Navbar = () => {
  return (
    <div className='navbar'>
        <h1>Kalvium E-Mart</h1>
        <div>
            <Link to="/registration"><button>Sign-In</button>
            <Link to="/sign-in"></Link><button>Sign-Up</button></Link>
        </div>
    </div>
  )
}

export default Navbar