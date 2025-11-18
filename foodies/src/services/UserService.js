const API_URL = 'https://food-delivery-app-shap.onrender.com/api'
import axios from 'axios'
const registerUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/register`, user,{headers:{'Content-Type':'application/json'}})
        return response.data
    } catch (error) {
        console.error('Error registering user:', error)
        throw new Error('Failed to register user')
    }
}
const loginUser = async (user) => {
    try {
        const response = await axios.post(`${API_URL}/login`, user,{headers:{'Content-Type':'application/json'}})
        return response.data
    } catch (error) {
        console.error('Error logging in user:', error)
        if (error.response) {
            // Server responded with error status
            const errorMessage = error.response.data?.message || error.response.data?.error || `Login failed: ${error.response.status} ${error.response.statusText}`
            throw new Error(errorMessage)
        } else if (error.request) {
            // Request was made but no response received
            throw new Error('No response from server. Please check if the server is running.')
        } else {
            // Something else happened
            throw new Error(error.message || 'Failed to login user')
        }
    }
}
export { registerUser, loginUser }