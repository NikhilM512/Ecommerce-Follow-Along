import React, { useEffect, useState } from 'react'
import OrdersData from "../Components/Orders.json";
import "./MyOrders.css"

const MyOrders = () => {

    const [orders,setOrders]=useState(null);
    const [totalPrice,setTotalPrice]=useState(0);
    let sum=0;

    useEffect(()=>{
        setOrders(OrdersData);
        
        OrdersData?.map((e)=>{
            console.log(typeof(sum),sum,typeof(e.productPrice*e.Quantity))
            sum+=(e.productPrice*e.Quatity)
        });
    });

    console.log(totalPrice)

  return (
    <div className='Order-Container'>
        <div className='Order-box'>
           
        {orders?.map((order,i)=>{
            return <div className='order-card' key={i}>
                
                <img src={order.productImage} alt={order.productName} />
                <div className="order-details">
                    <h3>{order.productName}</h3>
                    <p>{order.productDescription}</p>
                    <h4>Rs. {order.productPrice}</h4>
                    <p>{order.Quantity}</p>
                </div>

            </div>
        })}
        </div>

        <div className="Orders-details">
            <div className="details-box">
                <h3>Price : {}</h3>
            </div>
        </div>
        
    </div>
  )
}

export default MyOrders