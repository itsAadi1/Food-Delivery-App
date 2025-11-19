import React, { useState } from 'react'
import Header from '../components/Header'
import ExploreMenu from '../components/ExploreMenu'
import FoodDisplay from '../components/FoodDisplay'

const Home = () => {
  const [category, setCategory] = useState('All');
  const [searchText, setSearchText] = useState('');
  
  return (
    <main className="container">
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} /> 
      <FoodDisplay category={category} searchText={searchText}/>
    </main>
  )
}

export default Home
