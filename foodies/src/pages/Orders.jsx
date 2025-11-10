import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'

const Orders = () => {
  const { token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // TODO: Fetch orders from backend API
    // For now, we'll show a placeholder
    setLoading(false)
    // Simulated orders data - replace with actual API call
    setOrders([])
  }, [token])

  if (!token) {
    return (
      <div className="container py-5">
        <div className="text-center py-5">
          <h2 className="mb-3">Please login to view your orders</h2>
          <Link to="/login" className="btn btn-primary">
            <i className="bi bi-box-arrow-in-right me-2"></i>Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-5">
      <div className="row">
        <div className="col-12">
          <h1 className="mb-4">My Orders</h1>
          
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          ) : orders.length === 0 ? (
            <div className="card">
              <div className="card-body text-center py-5">
                <i className="bi bi-inbox display-1 text-muted"></i>
                <h3 className="mt-3">No orders yet</h3>
                <p className="text-muted">You haven't placed any orders yet. Start shopping to see your orders here.</p>
                <Link to="/explorefood" className="btn btn-primary">
                  <i className="bi bi-bag me-2"></i>Start Shopping
                </Link>
              </div>
            </div>
          ) : (
            <div className="row">
              {orders.map((order) => (
                <div key={order.id} className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                      <span className="fw-bold">Order #{order.id}</span>
                      <span className={`badge ${
                        order.status === 'completed' ? 'bg-success' :
                        order.status === 'pending' ? 'bg-warning' :
                        'bg-secondary'
                      }`}>
                        {order.status}
                      </span>
                    </div>
                    <div className="card-body">
                      <p className="mb-2">
                        <strong>Date:</strong> {new Date(order.date).toLocaleDateString()}
                      </p>
                      <p className="mb-2">
                        <strong>Total:</strong> ₹{order.total.toFixed(2)}
                      </p>
                      <p className="mb-3">
                        <strong>Items:</strong> {order.items.length}
                      </p>
                      <Link to={`/orders/${order.id}`} className="btn btn-sm btn-outline-primary">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Orders

