import React, { useState, useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { CartUtils } from '../util/CartUtils'
import { createOrder } from '../services/OrderService'
// import { verifyPayment } from '../services/OrderService' // Commented out - payment verification disabled
import { clearCart } from '../services/CartService'
import { toast } from 'react-toastify'

const PlaceOrder = () => {
  const { foodList, quantity, userEmail, loadCartItems } = useContext(StoreContext)
  const navigate = useNavigate()
  const cartItems = foodList.filter((food) => quantity[food.id] > 0)
  const { totalPrice, totalQuantity, hasItems, totalShipping, totalTax, totalAmount } = CartUtils(cartItems, quantity)
  const [loading, setLoading] = useState(false)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: userEmail || '',
    phoneNumber: '',
    address: '',
    address2: '',
    country: '',
    state: '',
    zip: '',
  })

  const [promoCode, setPromoCode] = useState('')
  const [appliedPromo, setAppliedPromo] = useState(null)

  // Pre-fill email if user is logged in
  useEffect(() => {
    if (userEmail) {
      setFormData(prev => ({ ...prev, email: userEmail }))
    }
  }, [userEmail])

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handlePromoCode = (e) => {
    e.preventDefault()
    if (promoCode.trim()) {
      setAppliedPromo({ code: promoCode, discount: 5 })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    
    try {
      // Prepare order items from cart
      const orderedItems = cartItems.map(food => ({
        foodId: food.id,
        name: food.name,
        quantity: quantity[food.id],
        price: food.price,
        category: food.category,
        imageUrl: food.imageUrl,
        description: food.description
      }))

      // Calculate final amount (with discount if applied)
      const finalAmount = totalAmount - (appliedPromo ? appliedPromo.discount : 0)
      
      // Build address string
      const fullAddress = [
        formData.address,
        formData.address2,
        formData.state,
        formData.country,
        formData.zip
      ].filter(Boolean).join(', ')

      // Create order request
      const orderRequest = {
        orderedItems: orderedItems,
        userAddress: fullAddress,
        amount: finalAmount, // Convert to paise for Razorpay
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        orderStatus: 'Pending'
      }

      // Create order with payment
      const orderResponse = await createOrder(orderRequest)
      
      if (!orderResponse.razorpayOrderId) {
        throw new Error('Failed to create order')
      }
      
      // Development mode: Skip Razorpay payment (since keys are invalid)
      // In production, uncomment the Razorpay code below and use real keys
      const DEV_MODE = true // Set to false when using real Razorpay keys
      
      if (DEV_MODE) {
        // Simulate successful payment in development mode
        try {
          // Payment is considered verified after order creation
          // Clear cart after successful payment
          try {
            await clearCart()
            if (loadCartItems) {
              await loadCartItems()
            }
          } catch (error) {
            console.error('Error clearing cart:', error)
          }
          
          toast.success('Order placed successfully! Payment verified.')
          setLoading(false)
          navigate('/orders')
        } catch (error) {
          console.error('Error processing order:', error)
          toast.error('Order processing failed. Please contact support.')
          setLoading(false)
        }
      } else {
        // Production mode: Use Razorpay payment gateway
        // Initialize Razorpay payment
        // Note: Razorpay key should be from environment variable or config
        const RAZORPAY_KEY = process.env.REACT_APP_RAZORPAY_KEY || 'your_razorpay_key'
        
        const options = {
          key: RAZORPAY_KEY,
          amount: Math.round(finalAmount * 100), // Amount in paise
          currency: 'INR',
          name: 'Foodies',
          description: 'Food Order Payment',
          order_id: orderResponse.razorpayOrderId,
          handler: async function (response) {
            try {
              setLoading(true)
              
              // Payment verification commented out - payment is considered verified after order creation
              // await verifyPayment({
              //   razorpay_order_id: response.razorpay_order_id,
              //   razorpay_payment_id: response.razorpay_payment_id,
              //   razorpay_signature: response.razorpay_signature
              // })
              
              // Payment is verified - clear cart after successful payment
              try {
                await clearCart()
                if (loadCartItems) {
                  await loadCartItems()
                }
              } catch (error) {
                console.error('Error clearing cart:', error)
              }
              
              toast.success('Order placed successfully! Payment verified.')
              navigate('/orders')
            } catch (error) {
              console.error('Error processing payment:', error)
              toast.error('Payment processing failed. Please contact support.')
              setLoading(false)
            }
          },
          prefill: {
            name: `${formData.firstName} ${formData.lastName}`.trim(),
            email: formData.email,
            contact: formData.phoneNumber
          },
          theme: {
            color: '#3399cc'
          },
          modal: {
            ondismiss: function() {
              setLoading(false)
              toast.info('Payment cancelled')
            }
          }
        }

        const razorpay = new window.Razorpay(options)
        razorpay.on('payment.failed', function (response) {
          toast.error('Payment failed: ' + (response.error?.description || 'Unknown error'))
          setLoading(false)
        })
        razorpay.open()
        setLoading(false) // Reset loading since Razorpay modal is open
      }
      
    } catch (error) {
      console.error('Error placing order:', error)
      toast.error(error.message || 'Failed to place order')
      setLoading(false)
    }
  }

  if (!hasItems) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <p className="text-muted mb-4">Your cart is empty</p>
          <Link to="/explorefood" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>Continue Shopping
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <h1 className="mb-5">Checkout</h1>
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column - Billing Address */}
          <div className="col-lg-8">
            <h4 className="mb-4">Billing address</h4>
            
            {/* First Name and Last Name */}
            <div className="row mb-3">
              <div className="col-md-6">
                <label htmlFor="firstName" className="form-label">First name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>


            {/* Email */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Phone Number */}
            <div className="mb-3">
              <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
              <input
                type="tel"
                className="form-control"
                id="phoneNumber"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Address */}
            <div className="mb-3">
              <label htmlFor="address" className="form-label">Address</label>
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                placeholder="1234 Main St"
                value={formData.address}
                onChange={handleInputChange}
                required
              />
            </div>

            {/* Address 2 */}
            <div className="mb-3">
              <label htmlFor="address2" className="form-label">Address 2 <span className="text-muted">(Optional)</span></label>
              <input
                type="text"
                className="form-control"
                id="address2"
                name="address2"
                placeholder="Apartment or suite"
                value={formData.address2}
                onChange={handleInputChange}
              />
            </div>

            {/* Country, State, Zip */}
            <div className="row mb-4">
              <div className="col-md-4">
                <label htmlFor="country" className="form-label">Country</label>
                <select
                  className="form-select"
                  id="country"
                  name="country"
                  value={formData.country}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select Country</option>
                  <option value="IN">India</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="state" className="form-label">State</label>
                <select
                  className="form-select"
                  id="state"
                  name="state"
                  value={formData.state}
                  onChange={handleInputChange}
                  required
                >
                  <option value="">Select State</option>
                  <option value="MH">Maharashtra</option>
                  <option value="DL">Delhi</option>
                  <option value="KA">Karnataka</option>
                  <option value="TN">Tamil Nadu</option>
                </select>
              </div>
              <div className="col-md-4">
                <label htmlFor="zip" className="form-label">Zip</label>
                <input
                  type="text"
                  className="form-control"
                  id="zip"
                  name="zip"
                  value={formData.zip}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <hr className="my-4" />

            <div className="text-end">
            <button 
              type="submit" 
              className="btn btn-primary w-100 btn-lg"
              disabled={loading}
            >
              {loading ? (
                <>
                  <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                  Processing...
                </>
              ) : (
                'Continue to checkout'
              )}
            </button>
            </div>
          </div>

          {/* Right Column - Cart Summary */}
          <div className="col-lg-4">
            <div className="card">
              <div className="card-body">
                <h4 className="card-title mb-4">
                  Your cart
                  <span className="badge bg-primary rounded-pill ms-2">{cartItems.length}</span>
                </h4>
                
                {/* Cart Items */}
                <ul className="list-unstyled">
                  {cartItems.map((food, index) => (
                    <li key={food.id} className="mb-3">
                      <div className="d-flex justify-content-between">
                        <div className="flex-grow-1">
                          <strong>{food.name}</strong>
                          <div className="text-muted small">{food.description || 'Brief description'}</div>
                        </div>
                        <div className="text-end">
                          <strong>₹{(food.price * (quantity[food.id] || 0)).toFixed(2)}</strong>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <hr />}
                    </li>
                  ))}
                </ul>

                {/* Promo Code Applied */}
                {appliedPromo && (
                  <div className="mb-3">
                    <div className="d-flex justify-content-between text-success">
                      <div>
                        <div>Promo code</div>
                        <small>{appliedPromo.code}</small>
                      </div>
                      <div>-₹{appliedPromo.discount.toFixed(2)}</div>
                    </div>
                  </div>
                )}

                <hr />

                {/* Order Summary */}
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{totalPrice.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>₹{totalShipping.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-3">
                  <span>Tax</span>
                  <span>₹{totalTax.toFixed(2)}</span>
                </div>
                {appliedPromo && (
                  <div className="d-flex justify-content-between mb-3 text-success">
                    <span>Discount</span>
                    <span>-₹{appliedPromo.discount.toFixed(2)}</span>
                  </div>
                )}
                <hr />
                <div className="d-flex justify-content-between mb-4">
                  <strong>Total (INR)</strong>
                  <strong>₹{(totalAmount - (appliedPromo ? appliedPromo.discount : 0)).toFixed(2)}</strong>
                </div>

                {/* Promo Code Input */}
                <div className="mb-3">
                  <form onSubmit={handlePromoCode} className="d-flex gap-2">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Promo code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <button type="submit" className="btn btn-secondary">
                      Redeem
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}

export default PlaceOrder
