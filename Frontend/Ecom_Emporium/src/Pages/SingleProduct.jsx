import React, { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import "./SingleProduct.css"

const SingleProduct = () => {

    const [product,setProduct]=useState({});
    const [qty, setQty]=useState(0)

    let {id}=useParams();

    const fetchData=async()=>{

       try {
            let res = await fetch(`http://localhost:7777/product/${id}`);
            res = await res.json();
            console.log(res)
            setProduct(res.data)
       } catch (error) {
           console.log(error)
       }

    };


    const handleClick=()=>{
      
    };

    const handleIncrement=()=>{
        // fetch("http://localhost:7777/product/")
    };

    const handleDecrement=()=>{

    };



    useEffect(()=>{

        fetchData();
        
    },[])

  return (
    <div className='card'>
        <img src={product.productImage} alt={product.productName} />
        <h3>Product Name: {product.productName}</h3>
        <h4>Price : {product.productPrice}</h4>
        <p>{product.productDescription}</p>
        <div style={{display:"flex"}}>
          <button onClick={handleIncrement}>+</button>
          <h3>{qty}</h3>
          <button onClick={handleDecrement}>-</button>
        </div>
        <button onClick={handleClick}>Add to Cart</button>
    </div>
  )
}

export default SingleProduct