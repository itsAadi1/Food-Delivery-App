import React from 'react'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <div className="p-5 bg-light rounded-3 mt-1">
        <div className="container-fluid py-5">
            <h1 className="display-5 fw-bold">Order your favorite food from your favorite restaurant</h1>
            <p className="col-md-8 fs-4">Discover the best food from your favorite restaurant</p>
            <Link to="/explorefood" className="btn btn-primary btn-lg">Explore Food</Link>
        </div>
    </div>
  )
}

export default Header
