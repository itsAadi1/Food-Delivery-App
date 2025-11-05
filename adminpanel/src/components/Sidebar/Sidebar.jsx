import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {assets} from '../../assets/assets'
export default function Sidebar({open}) {
  const location = useLocation();
  
  return (
    <div>
      <div className={`border-end ${open ? '' : 'd-none'}`} id="sidebar-wrapper">
                <div className="sidebar-heading">
                  <img src={assets.logo} alt="logo" height={40} width={40}/>
                  <span>Foodies Admin</span>
                </div>
                <div className="list-group list-group-flush">
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/addfood' ? 'active' : ''}`} 
                      to="/addfood">
                      <i className="bi bi-plus-circle"></i> 
                      <span>Add Food</span>
                    </Link>
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/listfood' || location.pathname === '/' ? 'active' : ''}`} 
                      to="/listfood">
                      <i className="bi bi-list-ul"></i> 
                      <span>List Food</span>
                    </Link>
                    <Link 
                      className={`list-group-item list-group-item-action ${location.pathname === '/orders' ? 'active' : ''}`} 
                      to="/orders">
                      <i className="bi bi-cart-check"></i> 
                      <span>Orders</span>
                    </Link>
                </div>
            </div>
    </div>
  )
}
