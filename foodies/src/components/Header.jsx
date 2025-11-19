import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <section className="hero-section rounded-4 mt-3">
      <div className="hero-overlay">
        <div className="container">
          <div className="row align-items-center g-4">
            <div className="col-lg-6">
              <div className="hero-content">
                <p className="hero-eyebrow">Fast • Fresh • Delivered</p>
                <h1>Order your favourite food</h1>
                <p>
                  Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <div className="d-flex flex-wrap gap-3 hero-cta">
                  <Link to="/explorefood" className="btn btn-light btn-lg px-5 py-3 fw-bold">
                    View Menu
                  </Link>
                  <Link to="/download" className="btn btn-outline-light btn-lg px-5 py-3">
                    Download App
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-6 text-center">
              <div className="hero-image">
                <img
                  src={assets.header_img}
                  alt="Foodies"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Header
