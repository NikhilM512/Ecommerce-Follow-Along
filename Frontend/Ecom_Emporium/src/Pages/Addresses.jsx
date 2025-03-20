import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import "./Addresses.css"

const Addresses = () => {

    let [profile,setProfile]=useState([]);
    const navigate=useNavigate();
  
  
    useEffect(()=>{
    //    console.log(localStorage.getItem("Token"))
      fetch("http://localhost:7777/user/profile",{
        method:"GET",
        headers:{"Content-Type":"application/json",
        "authorization":`Bearer ${localStorage.getItem("Token")}`}
      }).then((res)=>res.json())
      .then((res)=>{
        console.log(res,"hm");
        setProfile(res.data);
      })
    },[]);

  return (
    <>
        <section >
        {profile.addresses?profile.addresses?.map((e,i)=>
        <div key={i} className="address-box">
        <span >Address - {i+1} : {e.address1} {e.address2} {e.city} {e.country}</span>
        <input type="checkbox" />
        </div>):""}
        </section>
    </>
  )
}

export default Addresses