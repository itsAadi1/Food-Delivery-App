import axios from 'axios'

const API_URL = 'http://localhost:8080/api'

// Helper function to get token from localStorage
const getAuthToken = () => {
    return localStorage.getItem('token')
}

// Get all orders (admin)
const getAllOrders = async () => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        const response = await axios.get(
            `${API_URL}/orders/all`,
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
            console.error('Error getting all orders:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to get orders')
        } else {
            console.error('Error getting all orders:', error.message)
            throw error
        }
    }
}

// Update order status (admin)
const updateOrderStatus = async (orderId, status) => {
    try {
        const token = getAuthToken()
        if (!token) {
            throw new Error('Authentication required. Please login first.')
        }
        
        await axios.patch(
            `${API_URL}/orders/status/${orderId}`,
            null,
            {
                params: { status },
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            }
        )
    } catch (error) {
        if (error.response) {
            console.error('Error updating order status:', error.response.data)
            throw new Error(error.response.data.message || 'Failed to update order status')
        } else {
            console.error('Error updating order status:', error.message)
            throw error
        }
    }
}

// Delete order (admin)
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

export { getAllOrders, updateOrderStatus, deleteOrder }

