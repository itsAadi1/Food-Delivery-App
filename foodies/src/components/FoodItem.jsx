import React, { useContext } from 'react'
import { StoreContext } from '../context/StoreContext'
import { Link, useNavigate } from 'react-router-dom'
export default function FoodItem({food}) {
    const {quantity, increaseQuantity,decreaseQuantity} = useContext(StoreContext)
    const navigate = useNavigate()
    const navigateToDetails = () => navigate(`/food/${food.id}`)
    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            navigateToDetails()
        }
    }
    return (
        <div
            className="card h-100 shadow-sm"
            onClick={navigateToDetails}
            onKeyDown={handleKeyDown}
            role="button"
            tabIndex={0}
            style={{cursor: 'pointer'}}
        >
            <img
                src={food.imageUrl}
                className="card-img-top"
                alt={food.name}
                style={{height: '200px', objectFit: 'cover'}}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title mb-2" style={{wordBreak: 'normal', overflowWrap: 'anywhere'}}>{food.name}</h5>
                <p className="card-text text-muted mb-3" style={{minHeight: '48px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'}}>{food.description}</p>
                <div className="mt-auto d-flex justify-content-between align-items-center">
                    <span className="h5 mb-0">&#8377;{food.price}</span>
                    <div className="d-flex align-items-center gap-1">
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-fill text-warning"></i>
                        <i className="bi bi-star-half text-warning"></i>
                        <small className="text-muted">(4.5)</small>
                    </div>
                </div>
            </div>
            <div className="card-footer d-flex justify-content-between bg-light" onClick={(e) => e.stopPropagation()}>
                <Link className="btn btn-primary btn-sm" to={`/food/${food.id}`}>View Details</Link>
                <div className="d-flex align-items-center gap-1">
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => increaseQuantity(food.id)}>
                        <i className="bi bi-plus-circle"></i>
                    </button>
                    <span className="text-muted">{quantity[food.id] || 0}</span>
                    <button className="btn btn-outline-secondary btn-sm" onClick={() => decreaseQuantity(food.id)}>
                        <i className="bi bi-dash-circle"></i>
                    </button>
                </div>
            </div>
        </div>
    )
}