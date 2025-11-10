import React, { useContext, useState, useEffect, useRef } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
export default function Menubar() {
  const { token, setToken, userEmail, setUserEmail } = useContext(StoreContext)
  const [active, setActive] = useState('home')
  const [showProfileDropdown, setShowProfileDropdown] = useState(false)
  const {quantity} = useContext(StoreContext)
  const cartItems = Object.values(quantity).reduce((acc, curr) => acc + curr, 0)
  const navigate = useNavigate()
  const dropdownRef = useRef(null)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfileDropdown(false)
      }
    }

    if (showProfileDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showProfileDropdown])

  const handleLogout = () => {
    try {
      localStorage.removeItem('token')
      localStorage.removeItem('userEmail')
      setToken(null)
      if (setUserEmail) {
        setUserEmail(null)
      }
      setShowProfileDropdown(false)
      navigate('/')
    } catch (error) {
      console.error('Error logging out:', error)
    }
  }

  const handleLogin = () => {
    navigate('/login')
  }

  const handleRegister = () => {
    navigate('/register')
  }

  const handleOrders = () => {
    setShowProfileDropdown(false)
    navigate('/orders')
  }

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown)
  }
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
  <div className="container">
    <Link className="navbar-brand d-flex align-items-center" to="/">
        <img src={assets.logo} alt="logo" height={40} width={40}/>
        <span className="ms-2">Foodies</span>
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
          <Link className={`nav-link ${active === 'home' ? 'fw-bold' : ''}`} aria-current="page" to="/" onClick={() => setActive('home')}>Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${active === 'explore' ? 'fw-bold' : ''}`} to="/explorefood" onClick={() => setActive('explore')}>Explore</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${active === 'contact' ? 'fw-bold' : ''}`} to="/contactus" onClick={() => setActive('contact')}>Contact Us</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center gap-2">
      <div className="position-relative d-flex align-items-center">
        <Link className={`nav-link ${active === 'cart' ? 'active' : ''}`} to="/cart" onClick={() => setActive('cart')}>
          <img src={assets.cart} alt="cart" height={30} width={30}/>
        </Link>
        {cartItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-warning">
          {cartItems}
        </span>}
      </div>
      {token ? (
        <div className="dropdown" ref={dropdownRef}>
          <button 
            className="btn btn-outline-primary dropdown-toggle mx-2" 
            type="button" 
            id="profileDropdown" 
            onClick={toggleProfileDropdown}
            aria-expanded={showProfileDropdown}
          >
            <i className="bi bi-person-circle me-2"></i>
            {userEmail ? userEmail.split('@')[0] : 'Profile'}
          </button>
          {showProfileDropdown && (
            <ul 
              className="dropdown-menu dropdown-menu-end show" 
              aria-labelledby="profileDropdown"
              style={{ display: 'block' }}
            >
              <li>
                <Link 
                  className="dropdown-item" 
                  to="/orders"
                  onClick={handleOrders}
                >
                  <i className="bi bi-bag-check me-2"></i>Orders
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item text-danger" 
                  onClick={handleLogout}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <div className="d-flex align-items-center gap-2">
          <button className="btn btn-outline-primary mx-2" onClick={handleLogin}>Login</button>
          <button className="btn btn-success" onClick={handleRegister}>Register</button>
        </div>
      )}
      </div>
    </div>
  </div>
</nav>
</>
  )
}