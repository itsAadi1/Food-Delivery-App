import {createContext, useContext, useState, useEffect, useCallback} from 'react'
import { readFoods } from '../services/FoodService'
import { getCartItems, addToCart, removeFromCart } from '../services/CartService'
import {jwtDecode } from 'jwt-decode'
export const StoreContext = createContext(null)

const GUEST_CART_KEY = 'foodies_guest_cart'

const loadGuestCartFromStorage = () => {
    try {
        const stored = localStorage.getItem(GUEST_CART_KEY)
        return stored ? JSON.parse(stored) : {}
    } catch (error) {
        console.error('Error parsing guest cart from storage:', error)
        return {}
    }
}

const saveGuestCartToStorage = (cart) => {
    try {
        localStorage.setItem(GUEST_CART_KEY, JSON.stringify(cart || {}))
    } catch (error) {
        console.error('Error saving guest cart:', error)
    }
}

const clearGuestCartFromStorage = () => {
    localStorage.removeItem(GUEST_CART_KEY)
}

export const StoreContextProvider = (props) => {
   const [foodList, setFoodList] = useState([]);
   const [quantity, setQuantity] = useState(() => {
    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
        return loadGuestCartFromStorage()
    }
    return {}
   });
   const [token, setToken] = useState(localStorage.getItem('token'))
   const [userEmail, setUserEmail] = useState(localStorage.getItem('userEmail'))
   
   useEffect(() => {
    if (!token) return;
  
    try {
      const decoded = jwtDecode(token);
      const expTime = decoded.exp * 1000; // exp is in seconds, convert to ms
      const currentTime = Date.now();
      const timeLeft = expTime - currentTime;
  
      if (timeLeft <= 0) {
        // Token already expired
        setToken(null);
        setUserEmail(null);
      } else {
        // Schedule auto logout at expiry time
            const timer = setTimeout(() => {
          setToken(null);
          setUserEmail(null);
          alert('Session expired. Please log in again.');
        }, timeLeft);
  
        return () => clearTimeout(timer);
      }
    } catch (err) {
      console.error('Invalid token:', err);
      setToken(null);
      setUserEmail(null);
    }
  }, [token]);
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
        setQuantity(loadGuestCartFromStorage()) // Restore guest cart when logged out
    }
    // console.log('Token:', token)
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
            setQuantity(loadGuestCartFromStorage())
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
            setQuantity(loadGuestCartFromStorage())
        }
    }
   }, [])
   
   const mergeGuestCartWithBackend = useCallback(async () => {
    if (!token) return
    const guestCart = loadGuestCartFromStorage()
    const entries = Object.entries(guestCart || {})
    if (entries.length === 0) return
    try {
        for (const [foodId, qty] of entries) {
            for (let i = 0; i < qty; i++) {
                await addToCart(foodId)
            }
        }
        clearGuestCartFromStorage()
    } catch (error) {
        console.error('Error merging guest cart:', error)
    }
   }, [token])

   // Handle token changes (load guest cart or merge with backend)
   useEffect(() => {
    const handleTokenChange = async () => {
        if (token) {
            await mergeGuestCartWithBackend()
            await loadCartItems()
        } else {
            setQuantity(loadGuestCartFromStorage())
        }
    }
    handleTokenChange()
   }, [token, loadCartItems, mergeGuestCartWithBackend])
   
   const increaseQuantity = async (id) => {
    // Optimistic update
    setQuantity((prev) => {
        const updated = {
            ...prev,
            [id]: (prev[id] || 0) + 1
        }
        if (!token) {
            saveGuestCartToStorage(updated)
        }
        return updated
    })
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
        const nextValue = Math.max(0, (prev[id] || 0) - 1)
        if (nextValue === 0) {
            const newQuantity = { ...prev }
            delete newQuantity[id]
            if (!token) {
                saveGuestCartToStorage(newQuantity)
            }
            return newQuantity
        }
        const updated = {
            ...prev,
            [id]: nextValue
        }
        if (!token) {
            saveGuestCartToStorage(updated)
        }
        return updated
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
        if (!token) {
            saveGuestCartToStorage(newQuantity)
        }
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
    setQuantity((prev) => {
        const updated = {
            ...prev,
            [id]: Math.max(0, qty)
        }
        if (!token) {
            saveGuestCartToStorage(updated)
        }
        return updated
    })
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
        mergeGuestCartWithBackend,
    };
    
    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}