import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import FoodItem from './FoodItem'
const FoodDisplay = ({category = 'All', searchText = ''}) => {
    const {foodList} = useContext(StoreContext)
    const normalizedCategory = category || 'All'
    const normalizedSearch = typeof searchText === 'string' ? searchText.trim() : ''
    
    // Filter by category
    const filteredFood = (foodList || []).filter((food) => {
        if (normalizedCategory === 'All' || !normalizedCategory) return true
        return food.category === normalizedCategory
    })
    
    // Filter by search text (search in name and description)
    const filteredFoodBySearch = filteredFood.filter((food) => {
        if (!normalizedSearch) return true
        const searchLower = normalizedSearch.toLowerCase()
        return food.name?.toLowerCase().includes(searchLower) || 
               food.description?.toLowerCase().includes(searchLower)
    })
    return (
        <div className="container">
            <div className="row g-4">
                {filteredFoodBySearch?.length > 0? (filteredFoodBySearch?.map((food) => (
                    <div className="col-12 col-sm-6 col-md-4 col-lg-3" key={food.id}>
                        <FoodItem food={food} />
                    </div>
                ))): (
                    <div className="col-md-12">
                        <div className="alert alert-info">No food found</div>
                    </div>
                )}
            </div>  
        </div>
    )
}
export default FoodDisplay
