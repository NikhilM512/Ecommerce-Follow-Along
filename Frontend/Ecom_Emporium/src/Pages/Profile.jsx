import React, { useState } from 'react'
import { useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom';
import "./Profile.css"

const Profile = () => {

  let [profile,setProfile]=useState([]);
  const navigate=useNavigate();


  useEffect(()=>{
    console.log(localStorage.getItem("Token"))
    fetch("http://localhost:7777/user/profile",{
      method:"GET",
      headers:{"Content-Type":"application/json",
      "authorization":`Bearer ${localStorage.getItem("Token")}`}
    }).then((res)=>res.json())
    .then((res)=>{
      console.log(res);
      setProfile(res.data);
    });
  },[]);


  console.log(profile.address,"h")


  const handleAddress=()=>{
      navigate("/profile/address-form")
  }


  return (
    <>
    <div className='profile-container'>
      <section className='section-1'>
          <img src="https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
          <h1>{profile.name}</h1>
          <h2>{profile.email}</h2>  
      </section>

      <section className='section-2'>
        {profile.addresses?profile.addresses?.map((e,i)=><span key={i}>Address: {e.address1}</span>):""}
        <button className='add-address' onClick={handleAddress}>Add Address</button>
      </section>
    </div>
    </>
  )
}

export default Profile