import React from 'react'
import { Link } from 'react-router-dom'
import { assets } from '../assets/assets'

const Header = () => {
  return (
    <div className="position-relative rounded-3 mt-1 overflow-hidden" style={{
      height: '500px',
      backgroundColor: '#FF6B35',
      backgroundImage: `url(${assets.header_img})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundBlendMode: 'overlay'
    }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center" style={{
          background: 'linear-gradient(135deg, rgba(255, 107, 53, 0.9) 0%, rgba(255, 107, 53, 0.8) 100%)'
        }}>
          <div className="container-fluid px-5">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <h1 className="display-4 fw-bold text-white mb-4" style={{lineHeight: '1.2'}}>
                    Order your favourite food
                  </h1>
                  <p className="fs-5 text-white mb-4" style={{lineHeight: '1.6'}}>
                    Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                  </p>
                  <Link to="/explorefood" className="btn btn-light btn-lg px-5 py-3 fw-bold" style={{
                    borderRadius: '50px',
                    fontSize: '1.1rem',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                  }}>
                    View Menu
                  </Link>
                </div>
                <div className="col-lg-6 text-center">
                  <img 
                    src={assets.header_img} 
                    alt="food" 
                    className="img-fluid"
                    style={{
                      maxHeight: '450px',
                      objectFit: 'contain',
                      filter: 'drop-shadow(0 10px 30px rgba(0,0,0,0.3))'
                    }}
                  />
                </div>
              </div>
          </div>
        </div>
    </div>
  )
}

export default Header
