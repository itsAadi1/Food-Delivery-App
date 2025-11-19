import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {assets} from '../../assets/assets'
export default function Sidebar({open}) {
  const location = useLocation();
  
  return (
    <div>
      <div className={`border-end ${open ? '' : 'd-none'}`} id="sidebar-wrapper">
                <div className="sidebar-heading d-flex align-items-center gap-2">
                  <span style={{fontWeight: 700, fontSize: '1.25rem', color: '#FF6B35'}}>Foodies</span>
                  <span style={{fontSize: '0.95rem', color: '#64748b'}}>Admin</span>
                </div>
                <div className="list-group list-group-flush">
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/addfood' ? 'active' : ''}`} 
                      to="/addfood">
                      <img src={assets.add_icon} alt="add" style={{height: '20px', width: '20px', marginRight: '8px'}} />
                      <span>Add Food</span>
                    </Link>
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/listfood' || location.pathname === '/' ? 'active' : ''}`} 
                      to="/listfood">
                      <i className="bi bi-list-ul"></i> 
                      <span>List Food</span>
                    </Link>
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/bulkimport' ? 'active' : ''}`} 
                      to="/bulkimport">
                      <i className="bi bi-upload"></i> 
                      <span>Bulk Import</span>
                    </Link>
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/orders' ? 'active' : ''}`} 
                      to="/orders">
                      <img src={assets.order_icon} alt="orders" style={{height: '20px', width: '20px', marginRight: '8px'}} />
                      <span>Orders</span>
                    </Link>
                </div>
            </div>
    </div>
  )
}
