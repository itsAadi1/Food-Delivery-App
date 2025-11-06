import React from 'react'
import { assets } from '../assets/assets'
import { Link } from 'react-router-dom'
export default function Menubar() {
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
          <Link className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/explorefood">Explore</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/contactus">Contact Us</Link>
        </li>
      </ul>
      <div className="d-flex align-items-center gap-2">
      <div className="position-relative d-flex align-items-center">
        <a className="nav-link" href="#">
          <img src={assets.cart} alt="cart" height={30} width={30}/>
        </a>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          99+
        </span>
      </div>
      <button className="btn btn-outline-primary mx-2">Login</button>
      <button className="btn btn-success">Register</button>
      </div>
    </div>
  </div>
</nav>
</>
  )
}