import React from 'react'
import { assets } from '../../assets/assets'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { addFood } from '../../services/FoodService'
export default function AddFood() {
    const [image, setImage] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [data,setData] = useState({
        name: '',
        description: '',
        price: '',
        category: '',
    });
    const handleChange = (e) => {
        setData({...data, [e.target.id]: e.target.value})
    }
    const handleImage = (e) => {
        setImage(e.target.files[0])
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        await addFood(data,image)
        toast.success('Food added successfully')
        setData({
            name: '',
            description: '',
            price: '',
            category: '',
        })
        setImage(null) //reset the image
        setIsSubmitting(false)
    }
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-12 col-lg-8">
          <div className="card">
            <div className="card-body">
              <h2 className="mb-4" style={{fontWeight: 700, color: '#1e293b'}}>Add New Food Item</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="image" className="image-upload-label">
                    <img 
                      src={image ? URL.createObjectURL(image) : assets.upload_area} 
                      alt="upload" 
                      style={{height: '120px', width: '120px', objectFit: 'cover', cursor: 'pointer'}}
                    />
                    <span>{image ? 'Change Image' : 'Click to Upload Image'}</span>
                  </label>
                  <input 
                    type="file" 
                    className="form-control d-none" 
                    id="image" 
                    required 
                    onChange={handleImage}
                    accept="image/*"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Food Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    id="name" 
                    required 
                    onChange={handleChange} 
                    value={data.name}
                    placeholder="Enter food name"
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Food Description</label>
                  <textarea 
                    className="form-control" 
                    id="description" 
                    required 
                    onChange={handleChange} 
                    value={data.description}
                    rows="4"
                    placeholder="Enter food description"
                  />
                </div>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Food Price (₹)</label>
                    <input 
                      type="number" 
                      className="form-control" 
                      id="price" 
                      required 
                      onChange={handleChange} 
                      value={data.price}
                      placeholder="0.00"
                      min="0"
                      step="0.01"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">Food Category</label>
                    <select 
                      className="form-control" 
                      id="category" 
                      required 
                      onChange={handleChange} 
                      value={data.category}
                    >
                      <option value="">Select Category</option>
                      <option value="Biryani">Biryani</option>
                      <option value="Burger">Burger</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Sandwich">Sandwich</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Dessert">Dessert</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Salad">Salad</option>
                      <option value="Soup">Soup</option>
                      <option value="Drinks">Drinks</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Dinner">Dinner</option>
                    </select>
                  </div>
                </div>
                <div className="d-flex gap-3 align-items-center">
                  <button 
                    type="submit" 
                    disabled={isSubmitting} 
                    className="btn btn-primary"
                  >
                    {isSubmitting ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Adding...
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Food
                      </>
                    )}
                  </button>
                  {isSubmitting && (
                    <span className="text-muted">Please wait...</span>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
 