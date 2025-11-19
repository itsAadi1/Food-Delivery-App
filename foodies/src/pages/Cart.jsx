import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { CartUtils } from '../util/CartUtils'
import { assets } from '../assets/assets'
const Cart = () => {
  const {foodList,quantity,increaseQuantity,decreaseQuantity,removeItem} = useContext(StoreContext)
  const cartItems = foodList.filter((food) => quantity[food.id] > 0)
  const { totalPrice, hasItems, totalShipping, totalTax, totalAmount } = CartUtils(cartItems, quantity)
  const navigate = useNavigate()

  

  return (
    <>

<div className="container py-5">
    <h1 className="mb-5">Your Shopping Cart</h1>
    <div className="row">
        <div className="col-lg-8">
            <div className="card mb-4">
                <div className="card-body">
                    {cartItems.length === 0 ? (
                        <div className="text-center py-5">
                            <p className="text-muted mb-4">Your cart is empty</p>
                            <Link to="/explorefood" className="btn btn-primary">
                                <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                            </Link>
                        </div>
                    ) : (
                        cartItems.map((food, index) => (
                            <React.Fragment key={food.id}>
                                <div className="row cart-item mb-3 align-items-center">
                                    <div className="col-md-3">
                                        <img src={food.imageUrl} alt={food.name} className="img-fluid rounded" style={{maxHeight: '100px', objectFit: 'cover', width: '100%'}} />
                                    </div>
                                    <div className="col-md-5">
                                        <h5 className="card-title mb-1">{food.name}</h5>
                                        <p className="text-muted mb-0">Category: {food.category}</p>
                                    </div>
                                    <div className="col-md-2">
                                        <div className="input-group">
                                            <button 
                                                className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center" 
                                                type="button"
                                                onClick={() => decreaseQuantity(food.id)}
                                                style={{minWidth: '32px'}}
                                            >
                                                <img src={assets.remove_icon_red} alt="remove" style={{height: '16px', width: '16px'}} />
                                            </button>
                                            <input 
                                                style={{maxWidth: '100px'}} 
                                                type="text" 
                                                className="form-control form-control-sm text-center quantity-input" 
                                                value={quantity[food.id] || 0} 
                                                readOnly
                                            />
                                            <button 
                                                className="btn btn-outline-secondary btn-sm d-flex align-items-center justify-content-center" 
                                                type="button"
                                                onClick={() => increaseQuantity(food.id)}
                                                style={{minWidth: '32px'}}
                                            >
                                                <img src={assets.add_icon_green} alt="add" style={{height: '16px', width: '16px'}} />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="col-md-2 text-end">
                                        <p className="fw-bold mb-2">₹{(food.price * (quantity[food.id] || 0)).toFixed(2)}</p>
                                        <button 
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeItem(food.id)}
                                        >
                                            <i className="bi bi-trash"></i>
                                        </button>
                                    </div>
                                </div>
                                {index < cartItems.length - 1 && <hr />}
                            </React.Fragment>
                        ))
                    )}
                </div>
            </div>
            {cartItems.length > 0 && (
                <div className="text-start mb-4">
                    <Link to="/explorefood" className="btn btn-outline-primary">
                        <i className="bi bi-arrow-left me-2"></i>Continue Shopping
                    </Link>
                </div>
            )}
        </div>
        <div className = "col-lg-4">
            <div className="card cart-summary">
                <div className="card-body">
                    <h5 className="card-title mb-4">Order Summary</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Subtotal</span>
                        <span>₹{totalPrice.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Shipping</span>
                        <span>₹{totalShipping.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Tax</span>
                        <span>₹{totalTax.toFixed(2)}</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between mb-4">
                        <strong>Total</strong>
                        <strong>₹{totalAmount.toFixed(2)}</strong>
                    </div>
                    <button className="btn btn-primary w-100" disabled={!hasItems} onClick={() => navigate('/placeorder')}>Proceed to Checkout</button>
                </div>
            </div>
            <div className="card mt-4">
                <div className="card-body">
                    <h5 className="card-title mb-3">Apply Promo Code</h5>
                    <div className="input-group mb-3">
                        <input type="text" className="form-control" placeholder="Enter promo code" />
                        <button className="btn btn-outline-secondary" type="button">Apply</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</>
  )
}

export default Cart
