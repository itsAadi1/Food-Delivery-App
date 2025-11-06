import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import ExploreFood from './pages/ExploreFood'
import ContactUs from './pages/ContactUs'
import Menubar from './components/Menubar.jsx'
import Header from './components/Header.jsx'
import FoodDetails from './components/FoodDetails.jsx'
function App() {
  return (  
    <>
      <Menubar />   
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/explorefood' element={<ExploreFood />} />
        <Route path='/contactus' element={<ContactUs />} />
        <Route path='/food/:id' element={<FoodDetails />} />
      </Routes>
    </>
  )
}

export default App