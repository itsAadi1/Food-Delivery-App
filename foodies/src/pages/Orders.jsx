import React, { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import { StoreContext } from '../context/StoreContext'
import { getUserOrders, deleteOrder } from '../services/OrderService'
import { toast } from 'react-toastify'

const Orders = () => {
  const { token } = useContext(StoreContext)
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await getUserOrders()
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
      if (error.response?.status !== 401) {
        toast.error('Failed to load orders')
      }
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (token) {
      loadOrders()
    } else {
      setLoading(false)
    }
  }, [token])

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to cancel this order?')) {
      return
    }
    try {
      await deleteOrder(orderId)
      toast.success('Order cancelled successfully')
      loadOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
      toast.error('Failed to cancel order')
    }
  }

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
                      <span className="fw-bold">Order #{order.id?.substring(0, 8)}</span>
                      <div className="d-flex gap-2">
                        <span className={`badge ${
                          order.orderStatus === 'Completed' || order.orderStatus === 'Delivered' ? 'bg-success' :
                          order.orderStatus === 'Pending' ? 'bg-warning' :
                          order.orderStatus === 'Cancelled' ? 'bg-danger' :
                          'bg-secondary'
                        }`}>
                          {order.orderStatus || 'Pending'}
                        </span>
                        <span className={`badge ${
                          order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'
                        }`}>
                          {order.paymentStatus || 'Unpaid'}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <p className="mb-2">
                        <strong>Email:</strong> {order.email || 'N/A'}
                      </p>
                      <p className="mb-2">
                        <strong>Phone:</strong> {order.phoneNumber || 'N/A'}
                      </p>
                      <p className="mb-2">
                        <strong>Address:</strong> {order.userAddress || 'N/A'}
                      </p>
                      <p className="mb-2">
                        <strong>Total:</strong> ₹{((order.amount || 0)).toFixed(2)}
                      </p>
                      <p className="mb-3">
                        <strong>Items:</strong> {order.orderedItems?.length || 0}
                      </p>
                      <div className="d-flex gap-2">
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDeleteOrder(order.id)}
                          disabled={order.orderStatus === 'Cancelled' || order.orderStatus === 'Delivered'}
                        >
                          <i className="bi bi-x-circle me-1"></i>Cancel Order
                        </button>
                      </div>
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

