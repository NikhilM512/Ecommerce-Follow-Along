import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import './App.css'
import EditProducts from './Components/EditProducts'
import Home from './Pages/Home'
import LoginPage from './Components/Login'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import ProductForm from './Components/ProductForm'
import SignUp from './Components/SignUp'
import MyProduct from './Pages/MyProduct'
import Cart from './Pages/Cart'
import AddProduct from './Pages/AddProduct'
import SingleProduct from './Pages/SingleProduct'
import Profile from './Pages/Profile'
import AddressForm from './Components/AddressForm'
import Addresses from './Pages/Addresses'
import MyOrders from './Pages/MyOrders'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar></Navbar>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/my-product" element={<MyProduct></MyProduct>}></Route>
        <Route path="/add-product" element={<AddProduct></AddProduct>}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/product/:id" element={<SingleProduct></SingleProduct>}></Route>
        <Route path="/registration" element={<SignUp></SignUp>}></Route>
        <Route path="/sign-in" element={<LoginPage></LoginPage>}></Route>
        <Route path="/admin" element={<ProductForm></ProductForm>}></Route>
        <Route path="/editproduct/:id" element={<EditProducts></EditProducts>}></Route>
        <Route path="/profile" element={<Profile></Profile>}></Route>
        <Route path="/profile/address-form" element={<AddressForm></AddressForm>}></Route>
        <Route path="/addresses" element={<Addresses></Addresses>}></Route>
        <Route path="/my-order" element={<MyOrders></MyOrders>}></Route>
      </Routes>
    </>
  )
}

export default App
