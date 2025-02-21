import React, { useState } from 'react'
import { useEffect } from 'react'

const Profile = () => {

  let [profile,setProfile]=useState([]);


  useEffect(()=>{
    console.log(localStorage.getItem("Token"))
    fetch("http://localhost:7777/user/profile",{
      method:"GET",
      headers:{"Content-Type":"application/json",
      "authorization":`Bearer ${localStorage.getItem("Token")}`}
    }).then((res)=>res.json())
    .then((res)=>{
      console.log(res)
      setProfile(res)
    })
  },[]);


  const handleAddress=()=>{
      
  }


  return (
    <>
    <section>
        <img src="https://th.bing.com/th/id/OIP.Z306v3XdxhOaxBFGfHku7wHaHw?w=244&h=255&c=8&rs=1&qlt=90&o=6&dpr=1.3&pid=3.1&rm=2" alt="" />
        <h2>{profile.name}</h2>
        <h3>{profile.email}</h3>
    </section>

    <section>
      <p>Address</p>
      <button onClick={handleAddress}>Add Address</button>
    </section>
    </>
  )
}

export default Profile