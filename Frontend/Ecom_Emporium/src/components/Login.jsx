import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate } from 'react-router-dom';
import { handleSetEmail } from '../redux/actions/userActions';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const dispatch = useDispatch();
  const navigate=useNavigate();

  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    dispatch(handleSetEmail(email))
    
    if (!email || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }
       
    try {
      
      fetch('http://localhost:7777/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      }).then((res)=>res.json())
      .then((res)=>{
        console.log(res,res.cookies);
        const authToken = getCookie('authToken');
        if (authToken) {
          console.log('authToken cookie:', authToken);
          // Further actions based on the cookie value
        } else {
          console.log('authToken cookie not found.');
          // Handle the case where the cookie is missing
        }
        let token=res.token;
        localStorage.setItem("Token",token);
        // navigate("/")
      })
      
    } catch (error) {
      console.error('Login error:', error.message);
      setErrorMessage('An error occurred during login.');
    }
  };

  function getCookie(name) {
    const cookieString = document.cookie;
    if (!cookieString) {
      return null;
    }
  
    const cookies = cookieString.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return cookie.substring(name.length + 1);
      }
    }
    return null;
  }
  
  // Example usage:
  
  
  //Example of checking multiple cookies.
  const myCookie = getCookie('myCookie');
  if(myCookie){
      console.log("myCookie value: ", myCookie);
  } else {
      console.log("myCookie cookie not found");
  }

  return (
    <div className="flex w-100 justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white w-1/2 p-10 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        {errorMessage && (
          <div className="text-red-500 mb-4">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="Email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 p-2 w-full border rounded-md focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;