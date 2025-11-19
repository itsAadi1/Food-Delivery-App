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
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
  <div className="container">
    <Link className="navbar-brand fw-bold" to="/" style={{fontSize: '1.75rem', color: '#FF6B35', letterSpacing: '1px'}}>
        Foodies
    </Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0 d-flex align-items-center">
        <li className="nav-item">
          <Link className={`nav-link ${active === 'home' ? 'fw-bold text-primary' : ''}`} aria-current="page" to="/" onClick={() => setActive('home')}>home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${active === 'explore' ? 'fw-bold text-primary' : ''}`} to="/explorefood" onClick={() => setActive('explore')}>menu</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${active === 'contact' ? 'fw-bold text-primary' : ''}`} to="/contactus" onClick={() => setActive('contact')}>contact us</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center gap-3">
      <div className="position-relative d-flex align-items-center">
        <Link className={`nav-link ${active === 'search' ? 'active' : ''}`} to="/explorefood" onClick={() => setActive('search')} style={{padding: '8px'}}>
          <img src={assets.search_icon} alt="search" height={24} width={24} style={{opacity: 0.7}}/>
        </Link>
      </div>
      <div className="position-relative d-flex align-items-center">
        <Link className={`nav-link ${active === 'cart' ? 'active' : ''}`} to="/cart" onClick={() => setActive('cart')} style={{padding: '8px'}}>
          <img src={assets.cart} alt="cart" height={24} width={24} style={{opacity: 0.7}}/>
        </Link>
        {cartItems > 0 && <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.7rem', padding: '2px 6px'}}>
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
            <img src={assets.profile_icon} alt="profile" style={{height: '20px', width: '20px', marginRight: '8px'}} />
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
                  <img src={assets.bag_icon} alt="orders" style={{height: '18px', width: '18px', marginRight: '8px'}} />
                  Orders
                </Link>
              </li>
              <li><hr className="dropdown-divider" /></li>
              <li>
                <button 
                  className="dropdown-item text-danger" 
                  onClick={handleLogout}
                >
                  <img src={assets.logout_icon} alt="logout" style={{height: '18px', width: '18px', marginRight: '8px'}} />
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      ) : (
        <button className="btn btn-outline-primary" onClick={handleLogin} style={{
          borderRadius: '50px',
          padding: '8px 24px',
          fontWeight: '500'
        }}>
          sign in
        </button>
      )}
      </div>
    </div>
  </div>
</nav>
</>
  )
}