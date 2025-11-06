import {createContext, useContext, useState, useEffect} from 'react'
import { readFoods } from '../services/FoodService'
export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {
   const [foodList, setFoodList] = useState([]);
   const [quantity, setQuantity] = useState({});
   const increaseQuantity = (id) => {
    setQuantity((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
    }))
   }
   const decreaseQuantity = (id) => {
    setQuantity((prev) => {
        const current = prev[id] || 0
        const next = Math.max(0, current - 1)
        if (next === current) return prev
        return {
            ...prev,
            [id]: next
        }
    })
   }
   const removeItem = (id) => {
    setQuantity((prev) => {
        const newQuantity = { ...prev }
        delete newQuantity[id]
        return newQuantity
    })
   }
   const setItemQuantity = (id, qty) => {
    setQuantity((prev) => ({
        ...prev,
        [id]: Math.max(0, qty)
    }))
   }
   useEffect(() => {
    async function loadData() {
        try {
            const response = await readFoods()
            setFoodList(response || [])
        } catch (error) {
            console.error('Error loading foods:', error)
            setFoodList([])
        }
    }
    loadData();
   }, [])
   
    const contextValue = {
        foodList,
        quantity,
        increaseQuantity,
        decreaseQuantity,
        removeItem,
        setItemQuantity
    };
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}