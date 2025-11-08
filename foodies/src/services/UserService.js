const API_URL = 'http://localhost:8080/api'
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
        throw new Error('Failed to login user')
    }
}
export { registerUser, loginUser }