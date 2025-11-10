import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

// Helper function to get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token')
}

// Create order with payment (Razorpay)
const createOrder = async (orderRequest) => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        const response = await axios.post(
            `${API_URL}/orders/create`,
            orderRequest,
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
            console.error('Error creating order:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to create order')
        } else {
            console.error('Error creating order:', error.message)
            throw error
        }
    }
}

// Verify payment
const verifyPayment = async (paymentData) => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        await axios.post(
            `${API_URL}/orders/verify`,
            paymentData,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        if (error.response) {
            console.error('Error verifying payment:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to verify payment')
        } else {
            console.error('Error verifying payment:', error.message)
            throw error
        }
    }
}

// Get user orders
const getUserOrders = async () => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        const response = await axios.get(
            `${API_URL}/orders`,
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
            console.error('Error getting orders:', error.response.data)
            throw error
        } else {
            console.error('Error getting orders:', error.message)
            throw error
        }
    }
}

// Delete order
const deleteOrder = async (orderId) => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        await axios.delete(
            `${API_URL}/orders/${orderId}`,
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        if (error.response) {
            console.error('Error deleting order:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to delete order')
        } else {
            console.error('Error deleting order:', error.message)
            throw error
        }
    }
}

export { createOrder, verifyPayment, getUserOrders, deleteOrder }

