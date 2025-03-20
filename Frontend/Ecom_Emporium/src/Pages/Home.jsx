import React from 'react';
import "./Home.css";
// import productData from "./data.json"
import { useState } from 'react';
import { useEffect } from 'react';
import ProductCard from '../Components/ProductCard';
import axios from 'axios';
import { useSelector } from 'react-redux';
import store from '../redux/store';


const Home = () => {

  let [productData, setProductData] = useState([]);
  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl,"K")
  let email=useSelector((store)=>store.user.email)

  useEffect(() => {
    fetch(`http://localhost:7777/product`).then((res) => {
      return res.json();
    }).then((res) => {
      setProductData(res.data)
    }).catch((err) => {
      console.log(err);
    })
  }, []);

  const handleDelete = async (id) => {
    try {
      let response = await axios.delete(`http://localhost:7777/product/delete/${id}`)
      console.log(response.data.message);
      const filteredData = productData.filter((e) => e._id != id);
      setProductData(filteredData);
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {/* <h1>{email}</h1> */}

      <div className="container">
        {
          productData?.map((product) => {
            return <ProductCard key={product._id} product={product} handleDelete={handleDelete}>

            </ProductCard>
          })
        }
      </div>

    </>
  )
}

export default Home