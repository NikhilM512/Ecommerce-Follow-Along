import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import "./Cart.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const Cart = () => {

  let [products,setProduct]=useState([]);

  const navigate=useNavigate();

  const fetchData=()=>{
    fetch("http://localhost:7777/cart",{
      method:"GET",
      headers:{
       "authorization":`bearer ${localStorage.getItem("Token")}`}
    })
    .then((res)=>{
        return res.json();
    }).then((res)=>{
      console.log(res);
      if(res.message=="Login Please"){
        navigate("/sign-in");
      }
      setProduct(res.data);
    }).catch((err)=>{
      console.log(err);
    });
  };


  useEffect(()=>{
    fetchData();
  },[]);
  

  const handleDecrement=async(id,quantity)=>{
    if(quantity<=1){
      return;
    }
    try {
      const token = localStorage.getItem("Token"); 
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };
      const response = await axios.patch(`http://localhost:7777/cart/update/${id}`, { Quantity: quantity-1 }, config);
      console.log(response);
      fetchData();
    } catch (error) {
      console.log("Error updating product quantity:", error);
      alert("Failed to update product quantity.");
    }
  }


  const handleIncrement=async(id,quantity)=>{
    try {
      const token = localStorage.getItem("Token"); 
      const config = {
        headers: { authorization: `Bearer ${token}` }
      };
      const response = await axios.patch(`http://localhost:7777/cart/update/${id}`, { Quantity: quantity+1 }, config);
      console.log(response);
      fetchData();
    } catch (error) {
      console.log("Error updating product quantity:", error);
      alert("Failed to update product quantity.");
    }
  };

  const handleClick=()=>{
    navigate("/addresses")
  }


  return (
    <>
    <div className='cart-container'>
    {products?.map((el,i)=>{
         return <div  className="cart-box" key={i}>
            <img src={el.productId.productImage} alt={el.productId.productName} />
            <h2>{el.productId.productName}</h2>
            <h3>Price: ${el.productId.productPrice}</h3>
            <h4>{el.productId.productDescription}</h4>
            <div className="quantity-box">
              <button onClick={()=>handleDecrement(el._id,el.Quantity)}>-</button>
              <h5>{el.Quantity}</h5>
              <button onClick={()=>handleIncrement(el._id,el.Quantity)}>+</button>
            </div>
         </div>
    })}
    
    </div>
    <button onClick={handleClick} className='Place-Order'>Place Order</button>
    </>
  )
}

export default Cart