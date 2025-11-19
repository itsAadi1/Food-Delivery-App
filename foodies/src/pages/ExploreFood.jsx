import React, { useState } from 'react'
import FoodDisplay from '../components/FoodDisplay'
import { assets } from '../assets/assets'
const ExploreFood = () => {
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('All')
  const handleCategoryChange = (e) => {
    setCategory(e.target.value || 'All')
  }
  const handleSearchChange = (e) => {
    setSearchText(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    // Search is already handled by state updates
  }

  return (
    <div>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <form onSubmit={handleSearch}>
              <div className="input-group mb-3">
                <select className="form-select mt-2"
                style={{maxWidth: '150px'}}
                 id="category"
                 name="category"
                 onChange={handleCategoryChange}
                 value={category === 'All' ? '' : category}
                 >
                  <option value="">All Categories</option>
                  <option value="Salad">Salad</option>
                  <option value="Rolls">Rolls</option>
                  <option value="Deserts">Deserts</option>
                  <option value="Sandwich">Sandwich</option>
                  <option value="Cake">Cake</option>
                  <option value="Pure Veg">Pure Veg</option>
                  <option value="Pasta">Pasta</option>
                  <option value="Noodles">Noodles</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Burger">Burger</option>
                </select>
                <input type="text" className="form-control mt-2"
                placeholder="Search Food"
                name="searchText"
                onChange={handleSearchChange}
                value={searchText}
                />
                <button className="btn btn-primary mt-2 d-flex align-items-center justify-content-center" type="submit" style={{maxWidth: '50px'}}>
                  <img src={assets.search_icon} alt="search" style={{height: '20px', width: '20px'}} />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <FoodDisplay category={category} searchText={searchText} />
    </div>
  );
};  

export default ExploreFood;
