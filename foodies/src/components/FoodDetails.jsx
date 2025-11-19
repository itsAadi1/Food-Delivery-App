import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readFood } from "../services/FoodService";
import { StoreContext } from "../context/StoreContext";
import { addToCart, removeFromCart } from "../services/CartService";
import { assets } from "../assets/assets";
const FoodDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [localQuantity, setLocalQuantity] = useState(1);
  const [showSuccess, setShowSuccess] = useState(false);
  const { quantity, increaseQuantity, decreaseQuantity, setItemQuantity, loadCartItems } = useContext(StoreContext);
  
  const currentCartQuantity = quantity[data?.id] || 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await readFood(id);
        setData(response);
        setLocalQuantity(quantity[response?.id] || 1);
      } catch (error) {
        console.error('Error fetching food details:', error);
        setError(error?.response?.data?.message || 'Food item not found')
        setData(null)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id, quantity]);

  const handleQuantityChange = (value) => {
    const numValue = parseInt(value) || 1;
    setLocalQuantity(Math.max(1, numValue));
  };

  const handleIncreaseQuantity = () => {
    setLocalQuantity(prev => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    setLocalQuantity(prev => Math.max(1, prev - 1));
  };

  const handleAddToCart = async () => {
    if (!data) return;
    
    try {
      // Add items to cart (backend increments by 1 each time)
      for (let i = 0; i < localQuantity; i++) {
        await addToCart(data.id);
      }
      // Reload cart from backend to get accurate quantities
      if (loadCartItems) {
        await loadCartItems();
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error adding to cart:', error);
      // Optionally show error message
    }
  };

  const updateCartQuantity = async () => {
    if (!data) return;  
    
    try {
      const currentQty = currentCartQuantity;
      const targetQty = localQuantity;
      const difference = targetQty - currentQty;
      
      if (difference > 0) {
        // Add items
        for (let i = 0; i < difference; i++) {
          await addToCart(data.id);
        }
      } else if (difference < 0) {
        // Remove items
        for (let i = 0; i < Math.abs(difference); i++) {
          await removeFromCart(data.id);
        }
      }
      // Reload cart from backend to get accurate quantities
      if (loadCartItems) {
        await loadCartItems();
      }
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error('Error updating cart:', error);
      // Optionally show error message
    }
  };  
  if (loading) {
    return (
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center py-5">
            <div className="spinner-border text-primary mb-3" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="text-muted mb-0">Loading food details...</p>
          </div>
        </div>
      </section>
    )
  }

  if (!data && !loading) {
    return (
      <section className="py-5">
        <div className="container px-4 px-lg-5 my-5">
          <div className="text-center py-5">
            <h2 className="mb-3">Food Item Not Found</h2>
            {error && <p className="text-muted">{error}</p>}
            <Link to="/explorefood" className="btn btn-primary">
              <i className="bi bi-arrow-left me-2"></i>Back to Explore
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-5">
      <div className="container px-4 px-lg-5 my-5">
        {/* Success Message */}
        {showSuccess && (
          <div className="alert alert-success alert-dismissible fade show" role="alert">
            <i className="bi bi-check-circle me-2"></i>
            {currentCartQuantity > 0 ? 'Cart updated successfully!' : 'Item added to cart successfully!'}
            <button
              type="button"
              className="btn-close"
              onClick={() => setShowSuccess(false)}
              aria-label="Close"
            ></button>
          </div>
        )}

        <div className="row gx-4 gx-lg-5 align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <div className="position-relative">
              <img
                className="img-fluid rounded shadow"
                src={data?.imageUrl}
                alt={data?.name}
                style={{
                  width: '100%',
                  height: '500px',
                  objectFit: 'cover'
                }}
              />
              <span className="badge bg-primary position-absolute top-0 start-0 m-3 px-3 py-2">
                {data?.category}
              </span>
            </div>
          </div>

          {/* Details Section */}
          <div className="col-md-6">
            <div className="mb-3">
              <span className="badge bg-secondary mb-2">{data?.category}</span>
            </div>
            
            <h1 className="display-5 fw-bolder mb-3">{data?.name}</h1>
            
            {/* Rating */}
            <div className="mb-3">
              <div className="d-flex align-items-center gap-2 mb-2">
                <img src={assets.rating_starts} alt="rating" style={{height: '20px', width: '100px', objectFit: 'contain'}} />
                <span className="text-muted">(4.5)</span>
              </div>
            </div>

            {/* Price */}
            <div className="mb-4">
              <h3 className="text-primary mb-0">₹{data?.price?.toFixed(2)}</h3>
              <small className="text-muted">per item</small>
            </div>

            {/* Description */}
            <p className="lead mb-4" style={{ lineHeight: '1.8' }}>
              {data?.description}
            </p>

            <hr className="my-4" />

            {/* Quantity and Cart Section */}
            <div className="mb-4">
              <label className="form-label fw-bold mb-3">Quantity</label>
              <div className="d-flex align-items-center gap-3 mb-3">
                <div className="input-group" style={{ maxWidth: '150px' }}>
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    type="button"
                    onClick={handleDecreaseQuantity}
                    disabled={localQuantity <= 1}
                    style={{minWidth: '40px'}}
                  >
                    <img src={assets.remove_icon_red} alt="remove" style={{height: '18px', width: '18px'}} />
                  </button>
                  <input
                    className="form-control text-center"
                    type="number"
                    min="1"
                    value={localQuantity}
                    onChange={(e) => handleQuantityChange(e.target.value)}
                    style={{ maxWidth: '80px' }}
                  />
                  <button
                    className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
                    type="button"
                    onClick={handleIncreaseQuantity}
                    style={{minWidth: '40px'}}
                  >
                    <img src={assets.add_icon_green} alt="add" style={{height: '18px', width: '18px'}} />
                  </button>
                </div>
                <div className="text-muted">
                  <small>Total: <strong>₹{(data?.price * localQuantity).toFixed(2)}</strong></small>
                </div>
              </div>
              
              {currentCartQuantity > 0 && (
                <div className="alert alert-info mb-3">
                  <i className="bi bi-info-circle me-2"></i>
                  <strong>{currentCartQuantity}</strong> item(s) already in cart
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="d-flex flex-column flex-sm-row gap-3 mb-4">
              <button
                className="btn btn-primary btn-lg flex-fill"
                type="button"
                onClick={currentCartQuantity > 0 ? updateCartQuantity : handleAddToCart}
              >
                <i className="bi bi-cart-fill me-2"></i>
                {currentCartQuantity > 0 ? 'Update Cart' : 'Add to Cart'}
              </button>
              <button
                className="btn btn-outline-secondary btn-lg"
                type="button"
                onClick={() => navigate('/cart')}
              >
                <i className="bi bi-cart-check me-2"></i>
                View Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="mt-4 pt-4 border-top">
              <h5 className="mb-3">Product Information</h5>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="bi bi-tag me-2 text-primary"></i>
                  <strong>Category:</strong> {data?.category}
                </li>
                <li className="mb-2">
                  <i className="bi bi-currency-rupee me-2 text-primary"></i>
                  <strong>Price:</strong> ₹{data?.price?.toFixed(2)} per item
                </li>
                <li>
                  <i className="bi bi-shield-check me-2 text-success"></i>
                  <strong>Quality:</strong> Premium Quality Guaranteed
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FoodDetails;
