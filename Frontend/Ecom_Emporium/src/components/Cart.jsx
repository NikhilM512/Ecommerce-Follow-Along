import React from 'react'
import "./Cart.css"

const Cart = ({product}) => {
  return (
    <div className='cart'>
        <img src={product.imageUrl} alt={product.name} />
        <h3>Product Name: {product.name}</h3>
        <p>Price : {product.price}</p>
    </div>
  )
}

export default Cart