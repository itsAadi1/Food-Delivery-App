import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'

export default function FoodItem({food}) {
    const {quantity, increaseQuantity, decreaseQuantity} = useContext(StoreContext)
    const navigate = useNavigate()
    const navigateToDetails = () => navigate(`/food/${food.id}`)
    
    // Calculate discount and original price (for demo purposes)
    const originalPrice = food.price * 1.5 // Simulate original price
    const discountPercent = Math.round(((originalPrice - food.price) / originalPrice) * 100)
    const rating = 3.7 // Placeholder rating
    const reviews = 245 // Placeholder review count
    
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigateToDetails()
        }
    }
    
    const handleAddToCart = (e) => {
        e.stopPropagation()
        increaseQuantity(food.id)
    }
    
    return (
        <div
            className="card h-100 shadow-sm border-0"
            onClick={navigateToDetails}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            style={{cursor: 'pointer', overflow: 'hidden'}}
        >
            {/* Image with Rating Overlay */}
            <div style={{position: 'relative'}}>
                <img
                    src={food.imageUrl}
                    className="card-img-top"
                    alt={food.name}
                    style={{
                        height: '250px',
                        objectFit: 'cover',
                        width: '100%'
                    }}
                />
                {/* Rating Overlay */}
                <div
                    style={{
                        position: 'absolute',
                        bottom: '10px',
                        left: '10px',
                        backgroundColor: 'white',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '0.875rem',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                >
                    <span style={{fontWeight: '500'}}>{rating}</span>
                    <img src={assets.rating_starts} alt="rating" style={{height: '12px', width: '60px', objectFit: 'contain'}} />
                    <span style={{color: '#666', fontSize: '0.75rem'}}>|</span>
                    <span style={{color: '#666', fontSize: '0.75rem'}}>{reviews}</span>
                </div>
            </div>
            
            {/* Card Body */}
            <div className="card-body d-flex flex-column p-3">
                {/* Brand/Category */}
                <div
                    style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: '#666',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        marginBottom: '4px'
                    }}
                >
                    {food.category || 'Food'}
                </div>
                
                {/* Food Name */}
                <h6
                    className="mb-2"
                    style={{
                        fontWeight: '400',
                        color: '#333',
                        fontSize: '0.95rem',
                        lineHeight: '1.4',
                        minHeight: '40px',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                    }}
                >
                    {food.name}
                </h6>
                
                {/* Pricing Section */}
                <div className="mt-auto">
                    <div className="d-flex align-items-baseline gap-2 mb-2">
                        <span
                            style={{
                                fontSize: '1.1rem',
                                fontWeight: '700',
                                color: '#333'
                            }}
                        >
                            ₹{food.price.toFixed(0)}
                        </span>
                        <span
                            style={{
                                fontSize: '0.85rem',
                                color: '#999',
                                textDecoration: 'line-through'
                            }}
                        >
                            ₹{originalPrice.toFixed(0)}
                        </span>
                        <span
                            style={{
                                fontSize: '0.85rem',
                                color: '#FF6B35',
                                fontWeight: '600'
                            }}
                        >
                            ({discountPercent}% OFF)
                        </span>
                    </div>
                    
                    {/* Stock Status */}
                    <div
                        style={{
                            fontSize: '0.8rem',
                            fontWeight: '600',
                            color: '#FF6B35',
                            marginBottom: '12px'
                        }}
                    >
                        Only Few Left!
                    </div>
                    
                    {/* Add to Cart Button */}
                    <button
                        className="btn w-100"
                        onClick={handleAddToCart}
                        style={{
                            backgroundColor: '#4A90E2',
                            color: 'white',
                            border: 'none',
                            padding: '8px',
                            borderRadius: '4px',
                            fontWeight: '500',
                            fontSize: '0.9rem'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#357ABD'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#4A90E2'}
                    >
                        {quantity[food.id] > 0 ? (
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <button
                                    className="btn btn-sm p-0"
                                    style={{color: 'white', minWidth: '24px'}}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        decreaseQuantity(food.id)
                                    }}
                                >
                                    <img src={assets.remove_icon_red} alt="remove" style={{height: '20px', width: '20px', filter: 'brightness(0) invert(1)'}} />
                                </button>
                                <span>{quantity[food.id]}</span>
                                <button
                                    className="btn btn-sm p-0"
                                    style={{color: 'white', minWidth: '24px'}}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        increaseQuantity(food.id)
                                    }}
                                >
                                    <img src={assets.add_icon_white} alt="add" style={{height: '20px', width: '20px'}} />
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex align-items-center justify-content-center gap-2">
                                <img src={assets.add_icon_green} alt="add" style={{height: '20px', width: '20px'}} />
                                <span>Add to Cart</span>
                            </div>
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}