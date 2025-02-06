import React from 'react';
import "./Home.css";
// import productData from "./data.json"
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from './ProductCard';

const Home = () => {

  let [productData,setProductData]=useState([]);

  useEffect(()=>{
    fetch("http://localhost:7777/product").then((res)=>{
      return res.json();
    }).then((res)=>{
      console.log(res);
      setProductData(res.data)
    }).catch((err)=>{
      console.log(err);
    })
  },[]);

  return (
    <>
      {/* <nav>
        <div>
            <h1>Kalvium E-cart</h1>
        </div>
        <div className='nav-2'>
        <button className='login-btn'>Login</button>
        <button className='signup-btn'>Sign-Up</button>
        </div>
      </nav> */}

      <div className="container">
        {
          productData?.map((product)=>{
            return <ProductCard product={product}>
              
            </ProductCard>
          })
        }
      </div>
      
    </>
  )
}

export default Home