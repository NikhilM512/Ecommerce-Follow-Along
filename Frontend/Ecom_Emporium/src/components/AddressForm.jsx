import React from 'react'
import { useState } from 'react'

const AddressForm = () => {

    const [country,setCountry]=useState("");
    const [city,setCity]=useState("");
    const [address1,setAddress1]=useState("");
    const [address2,setAddress2]=useState("");
    const [zipCode,setZipCode]=useState("");
    const [addressType,setAddressType]=useState("");

    const handleAddress=(e)=>{
        e.preventDefault();

        let data={country,city,address1,address2,zipCode,addressType}
        
        fetch('',{
            method:"POST",
            body:JSON.stringify(data),
            headers:""
        })
    }

  return (
    <form action="" onSubmit={handleAddress}>
    <label htmlFor="">Country Name</label>
    <input type="text" onChange={(e)=>setCountry(e.target.value)} placeholder='Enter Country Name' value={country}/>
    <label htmlFor="">City Name</label>
    <input type="text" onChange={(e)=>setCity(e.target.value)} placeholder='Enter City Name' value={city}/>
    <label htmlFor="">Address1</label>
    <input type="text" onChange={(e)=>setAddress1(e.target.value)} placeholder='Enter Address1' value={address1}/>
    <label htmlFor="">Address2</label>
    <input type="text" onChange={(e)=>setAddress2(e.target.value)} placeholder='Enter Address2' value={address2}/>
    <label htmlFor="">ZIP Code</label>
    <input type="text" onChange={(e)=>setZipCode(e.target.value)} placeholder='Enter ZIP Code' value={zipCode}/>
    <label htmlFor="">Address Type</label>
    <select style={{'width':"80%",margin:"auto",}} onChange={(e)=>setAddressType(e.target.value)} >
        <option value="Home">Home</option>
        <option value="Office">Office</option>
    </select>
    <button style={{'width':"80%",margin:" 2% auto",}} >Add address</button>
   </form>
  )
}

export default AddressForm