import React from 'react'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { deleteFood } from '../../services/FoodService'
import { readFoods } from '../../services/FoodService'
function ListFood() {
    const [list,setList] = useState([]);
    const fetchList = async ()=>{
        try {
            const response = await readFoods()
            setList(response.data)
        } catch (error) {
            console.error('Error fetching list:', error)
        }
    }
    const handleDelete = async (id)=>{
        try {
            const response = await deleteFood(id)
            await fetchList()
            toast.success('Food deleted successfully')
        } catch (error) {
            console.error('Error deleting food:', error)
            toast.error('Failed to delete food')
        }
    }
    useEffect(() => {
        fetchList()
    }, [])
    
  return (
    <div className="py-5 row justify-content-center">
        <div className="col-12 col-lg-11 card">
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="mb-0" style={{fontWeight: 700, color: '#1e293b'}}>Food Items</h2>
                    <span className="badge bg-primary" style={{fontSize: '0.875rem', padding: '0.5rem 1rem'}}>
                        {list?.length || 0} Items
                    </span>
                </div>
                {list && list.length > 0 ? (
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Image</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Category</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((item,index)=>{
                                    return (
                                        <tr key={index}>
                                            <td>
                                                <img 
                                                    src={item.imageUrl} 
                                                    alt={item.name} 
                                                    style={{
                                                        height: '64px', 
                                                        width: '64px', 
                                                        objectFit: 'cover',
                                                        borderRadius: '8px'
                                                    }} 
                                                />
                                            </td>
                                            <td style={{fontWeight: 600, color: '#1e293b'}}>{item.name}</td>
                                            <td style={{color: '#64748b', maxWidth: '300px'}}>
                                                {item.description ? (
                                                    item.description.length > 50 
                                                        ? `${item.description.substring(0, 50)}...` 
                                                        : item.description
                                                ) : '-'}
                                            </td>
                                            <td style={{fontWeight: 700, color: '#10b981', fontSize: '1.1rem'}}>
                                                &#8377;{item.price}
                                            </td>
                                            <td>
                                                <span className="badge bg-secondary" style={{padding: '0.375rem 0.75rem'}}>
                                                    {item.category}
                                                </span>
                                            </td>
                                            <td>
                                                <div 
                                                    className="action-btn text-danger" 
                                                    onClick={()=>handleDelete(item.id)}
                                                    title="Delete item"
                                                >
                                                    <i className='bi bi-trash3-fill' style={{fontSize: '1.2rem'}}></i>
                                                </div>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="empty-state">
                        <i className="bi bi-inbox"></i>
                        <h4>No food items found</h4>
                        <p>Add your first food item to get started!</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}

export default ListFood
