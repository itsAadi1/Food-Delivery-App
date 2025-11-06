import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { Link, useNavigate } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { useState } from 'react'
export default function Menubar() {
  const [active, setActive] = useState('home')
  const {quantity} = useContext(StoreContext)
  const cartItems = Object.values(quantity).reduce((acc, curr) => acc + curr, 0)
  const navigate = useNavigate()
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
      <button className="btn btn-outline-primary mx-2" onClick={() => navigate('/login')}>Login</button>
      <button className="btn btn-success" onClick={() => navigate('/register')}>Register</button>
      </div>
    </div>
  </div>
</nav>
</>
  )
}