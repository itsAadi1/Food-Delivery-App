import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState('All');
  
  return (
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} /> 
      <FoodDisplay category={category}/>
    </main>
  )
}

export default Home
