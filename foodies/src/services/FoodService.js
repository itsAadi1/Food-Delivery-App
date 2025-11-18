import axios from 'axios'
const API_URL = 'https://food-delivery-app-shap.onrender.com/api/foods'

const readFoods = async () => {
    try {
    const response = await axios.get(API_URL)
    return response.data
    } catch (error) {
        console.error('Error reading foods:', error)
        throw new Error('Failed to read foods')
    }
}
const readFood = async (id) => {
    try {
        const response = await axios.get(`${API_URL}/${id}`)
        return response.data
    } catch (error) {
        console.error('Error reading food:', error)
        throw new Error('Failed to read food')
    }
}

export { readFoods, readFood}