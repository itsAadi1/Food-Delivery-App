import {createContext, useContext, useState, useEffect, useCallback} from 'react'
import { readFoods } from '../services/FoodService'
import { getCartItems, addToCart, removeFromCart } from '../services/CartService'
export const StoreContext = createContext(null)

export const StoreContextProvider = (props) => {
   const [foodList, setFoodList] = useState([]);
   const [quantity, setQuantity] = useState({});
   const [token, setToken] = useState(localStorage.getItem('token'))
   const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
   
   // Load token and userEmail from localStorage on mount
   useEffect(() => {
    const storedToken = localStorage.getItem('token')
    const storedEmail = localStorage.getItem('userEmail')
    if (storedToken) {
        setToken(storedToken)
    }
    if (storedEmail) {
        setUserEmail(storedEmail)
    }
   }, [])
   
   // Sync token to localStorage whenever it changes
   useEffect(() => {
    if (token) {
        localStorage.setItem('token', token)
    } else {
        localStorage.removeItem('token')
        setQuantity({}) // Clear cart when logged out
    }
   }, [token])
   
   // Sync userEmail to localStorage whenever it changes
   useEffect(() => {
    if (userEmail) {
        localStorage.setItem('userEmail', userEmail)
    } else {
        localStorage.removeItem('userEmail')
    }
   }, [userEmail])
   
   // Memoize loadCartItems to prevent infinite loops
   const loadCartItems = useCallback(async () => {
    try {
        const currentToken = localStorage.getItem('token')
        if (!currentToken) {
            setQuantity({})
            return
        }
        const response = await getCartItems()
        if (response && response.items) {
            setQuantity(response.items)
        }
    } catch (error) {
        console.error('Error loading cart items:', error)
        // If unauthorized, clear cart
        if (error.response?.status === 401) {
            setQuantity({})
        }
    }
   }, [])
   
   // Load cart when token changes
   useEffect(() => {
    if (token) {
        loadCartItems()
    } else {
        setQuantity({})
    }
   }, [token, loadCartItems])
   
   const increaseQuantity = async (id) => {
    // Optimistic update
    setQuantity((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + 1
    }))
    // Sync with backend
    try {
        const token = localStorage.getItem('token')
        if (token) {
            await addToCart(id)
            // Reload cart to ensure sync
            await loadCartItems()
        }
    } catch (error) {
        console.error('Error increasing quantity:', error)
        // Revert on error
        await loadCartItems()
    }
   }
   
   const decreaseQuantity = async (id) => {
    const current = quantity[id] || 0
    if (current <= 0) return
    
    // Optimistic update
    setQuantity((prev) => {
        const next = Math.max(0, current - 1)
        if (next === 0) {
            const newQuantity = { ...prev }
            delete newQuantity[id]
            return newQuantity
        }
        return {
            ...prev,
            [id]: next
        }
    })
    // Sync with backend
    try {
        const token = localStorage.getItem('token')
        if (token) {
            await removeFromCart(id)
            // Reload cart to ensure sync
            await loadCartItems()
        }
    } catch (error) {
        console.error('Error decreasing quantity:', error)
        // Revert on error
        await loadCartItems()
    }
   }
   
   const removeItem = async (id) => {
    const current = quantity[id] || 0
    if (current === 0) return
    
    // Optimistic update
    setQuantity((prev) => {
        const newQuantity = { ...prev }
        delete newQuantity[id]
        return newQuantity
    })
    // Sync with backend - remove all quantities
    try {
        const token = localStorage.getItem('token')
        if (token) {
            // Remove one by one until quantity is 0
            for (let i = 0; i < current; i++) {
                await removeFromCart(id)
            }
            // Reload cart to ensure sync
            await loadCartItems()
        }
    } catch (error) {
        console.error('Error removing item:', error)
        // Revert on error
        await loadCartItems()
    }
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
            console.log('Foods loaded:', response)
            setFoodList(response || [])
        } catch (error) {
            console.error('Error loading foods:', error)
            console.error('Error details:', error.response?.data || error.message)
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
        setItemQuantity,
        token,
        setToken,
        userEmail,
        setUserEmail,
        loadCartItems,
    };
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}