import React, { useState } from 'react'
import FoodDisplay from '../components/FoodDisplay'
const ExploreFood = () => {
  const [searchText, setSearchText] = useState('')
  const [category, setCategory] = useState('')
  const handleChange = (e) => {
    setCategory(e.target.value)
  }
  const handleSearch = (e) => {
    e.preventDefault()
    setCategory(e.target.category.value)
    setSearchText(e.target.searchText.value)
    console.log(category, searchText)
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
                 onChange={handleChange}
                 value={category}
                 >
                  <option value="">Select Category</option>
                  <option value="Biryani">Biryani</option>
                  <option value="Burger">Burger</option>
                  <option value="Pizza">Pizza</option>
                </select>
                <input type="text" className="form-control mt-2"
                placeholder="Search Food"
                name="searchText"
                onChange={(e) => setSearchText(e.target.value)}
                value={searchText}
                />
                <button className="btn btn-primary mt-2" type="submit" style={{maxWidth: '50px'}}><i className="bi bi-search"></i></button>
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
