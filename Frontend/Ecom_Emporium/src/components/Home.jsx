import React from 'react';
import "./Home.css";
import productData from "./data.json"
import Cart from './Cart';

const Home = () => {

  return (
    <>
      <nav>
        <div>
            <h1>Kalvium E-cart</h1>
        </div>
        <div className='nav-2'>
        <button className='login-btn'>Login</button>
        <button className='signup-btn'>Sign-Up</button>
        </div>
      </nav>

      <div className="container">
        {
          productData?.map((product)=>{
            return <Cart product={product}>
              
            </Cart>
          })
        }
      </div>
      
    </>
  )
}

export default Home