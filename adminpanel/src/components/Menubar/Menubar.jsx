import React from 'react'
import { assets } from '../../assets/assets'

export default function Menubar({toggle}) {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid d-flex align-items-center">
        <button 
          className="btn btn-primary" 
          id="sidebarToggle" 
          onClick={toggle}
          style={{borderRadius: '8px'}}
        >
          <i className="bi bi-list"></i>
        </button>
        <div className="ms-auto d-flex align-items-center gap-3">
          <div className="d-flex align-items-center gap-2">
            <img 
              src={assets.profile_image} 
              alt="profile" 
              style={{height: '32px', width: '32px', borderRadius: '50%', objectFit: 'cover'}}
            />
            <span style={{fontWeight: 600, color: '#1e293b'}}>Admin</span>
          </div>
        </div>
      </div>
    </nav>
  )
}