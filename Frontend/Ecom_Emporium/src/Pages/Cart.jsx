import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react'

const Cart = () => {

  let [products,setProduct]=useState([])

  useEffect(()=>{
      fetch("http://localhost:7777/cart",{
        method:"GET",
        headers:{"Content-Type":"application/json",
         "authorization":`bearer ${localStorage.getItem("Token")}`}
      })
      .then((res)=>{
          return res.json();
      }).then((res)=>{
        console.log(res)
        setProduct(res.data);
      })
  },[]);


  return (
    <>
    {products?.map((el)=>{
         return <div>
          <img src={el.productId.productImage[0]} alt={el.productId.productName} />
          <h2>Name: {el.productId.productName}</h2>
          <h3>Price: {el.productId.productPrice}</h3>
          <h4>{el.productId.productDescription}</h4>
         </div>
    })}
    </>
  )
}

export default Cart