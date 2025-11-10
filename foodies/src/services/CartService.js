import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

// Helper function to get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token')
}

const addToCart = async (foodId) => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        const response = await axios.post(
            `${API_URL}/cart`, 
            { foodId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error adding to cart:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to add to cart')
        } else {
            console.error('Error adding to cart:', error.message)
            throw error
        }
    }
}

const getCartItems = async () => {  
    const token = getAuthToken()
    if (!token) {
        throw new Error('Authentication required. Please login first.')
    }
    try {
        const response = await axios.get(`${API_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error getting cart items:', error.response.data)
            throw error // Re-throw to handle 401 in StoreContext
        } else {
            console.error('Error getting cart items:', error.message)
            throw error
        }
    }
}

const removeFromCart = async (foodId) => {
    const token = getAuthToken()
    if (!token) {
        throw new Error('Authentication required. Please login first.')
    }
    try {
        const response = await axios.post(
            `${API_URL}/cart/remove`, 
            { foodId },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
        return response.data
    } catch (error) {
        if (error.response) {
            console.error('Error removing from cart:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to remove from cart')
        } else {
            console.error('Error removing from cart:', error.message)
            throw error
        }
    }
}

const clearCart = async () => {
    const token = getAuthToken()
    if (!token) {
        throw new Error('Authentication required. Please login first.')
    }
    try {
        await axios.delete(`${API_URL}/cart`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        })
    } catch (error) {
        if (error.response) {
            console.error('Error clearing cart:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to clear cart')
        } else {
            console.error('Error clearing cart:', error.message)
            throw error
        }
    }
}

export { addToCart, getCartItems, removeFromCart, clearCart }