import axios from 'axios'

const API_URL = 'https://food-delivery-app-shap.onrender.com/api/foods'
const addFood = async (food,image) => {
        const formData=new FormData();
        formData.append('food', JSON.stringify(food));
        formData.append('file', image);
        try {
        await axios.post(API_URL, formData,{headers:{'Content-Type':'multipart/form-data'}})
        } catch (error) {
        console.error('Error adding food:', error)
        throw new Error('Failed to add food')
    }
}
const readFoods = async () => {
    try {
        const response = await axios.get(API_URL)
        return response.data
    } catch (error) {
        console.error('Error reading foods:', error)
        throw new Error('Failed to read foods')
    }
}
const deleteFood = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/${id}`)
        return response
    } catch (error) {
        console.error('Error deleting food:', error)
        throw new Error('Failed to delete food')
    }
}   
export { addFood, readFoods, deleteFood }  