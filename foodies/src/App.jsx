import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExploreFood from './pages/ExploreFood'
import ContactUs from './pages/ContactUs'
import Menubar from './components/Menubar.jsx'
import Header from './components/Header.jsx'
import FoodDetails from './components/FoodDetails.jsx'
import Cart from './pages/Cart.jsx'
import PlaceOrder from './pages/PlaceOrder.jsx'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import Orders from './pages/Orders.jsx'
function App() {
  return (  
    <>
      <Menubar />   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explorefood' element={<ExploreFood />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/food/:id' element={<FoodDetails />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/placeorder' element={<PlaceOrder />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/orders' element={<Orders />} />
      </Routes>
    </>
  )
}

export default App