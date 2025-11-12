import React, { useState, useEffect } from 'react'
import { getAllOrders, updateOrderStatus, deleteOrder } from '../../services/OrderService'
import { toast } from 'react-toastify'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState('All')

  const loadOrders = async () => {
    try {
      setLoading(true)
      const data = await getAllOrders()
      setOrders(data || [])
    } catch (error) {
      console.error('Error loading orders:', error)
      toast.error('Failed to load orders')
      setOrders([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadOrders()
  }, [])

  const handleStatusUpdate = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus)
      toast.success('Order status updated successfully')
      loadOrders()
    } catch (error) {
      console.error('Error updating order status:', error)
      toast.error('Failed to update order status')
    }
  }

  const handleDeleteOrder = async (orderId) => {
    if (!window.confirm('Are you sure you want to delete this order?')) {
      return
    }
    try {
      await deleteOrder(orderId)
      toast.success('Order deleted successfully')
      loadOrders()
    } catch (error) {
      console.error('Error deleting order:', error)
      toast.error('Failed to delete order')
    }
  }

  const filteredOrders = statusFilter === 'All' 
    ? orders 
    : orders.filter(order => order.orderStatus === statusFilter)

  return (
    <div className="py-5">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-12 col-lg-11">
            <div className="card">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2 className="mb-0" style={{fontWeight: 700, color: '#1e293b'}}>All Orders</h2>
                  <div className="d-flex gap-2 align-items-center">
                    <select 
                      className="form-select"
                      style={{maxWidth: '200px'}}
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                    >
                      <option value="All">All Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                    <span className="badge bg-primary" style={{fontSize: '0.875rem', padding: '0.5rem 1rem'}}>
                      {filteredOrders.length} Orders
                    </span>
                  </div>
                </div>

                {loading ? (
                  <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                ) : filteredOrders.length === 0 ? (
                  <div className="text-center py-5">
                    <i className="bi bi-inbox display-1 text-muted"></i>
                    <h4 className="mt-3">No orders found</h4>
                    <p className="text-muted">No orders match the selected filter.</p>
                  </div>
                ) : (
                  <div className="table-responsive">
                    <table className="table table-hover">
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Customer</th>
                          <th>Items</th>
                          <th>Amount</th>
                          <th>Status</th>
                          <th>Payment</th>
                          <th>Address</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id}>
                            <td>
                              <small className="text-muted">#{order.id?.substring(0, 8)}</small>
                            </td>
                            <td>
                              <div>
                                <div className="fw-bold">{order.email}</div>
                                <small className="text-muted">{order.phoneNumber}</small>
                              </div>
                            </td>
                            <td>
                              <span className="badge bg-info">
                                {order.orderedItems?.length || 0} items
                              </span>
                            </td>
                            <td>
                              <strong className="text-success">₹{((order.amount || 0)).toFixed(2)}</strong>
                            </td>
                            <td>
                              <select 
                                className="form-select form-select-sm"
                                value={order.orderStatus || 'Pending'}
                                onChange={(e) => handleStatusUpdate(order.id, e.target.value)}
                                style={{minWidth: '120px'}}
                              >
                                <option value="Pending">Pending</option>
                                <option value="Processing">Processing</option>
                                <option value="Shipped">Shipped</option>
                                <option value="Delivered">Delivered</option>
                                <option value="Cancelled">Cancelled</option>
                              </select>
                            </td>
                            <td>
                              <span className={`badge ${
                                order.paymentStatus === 'Paid' ? 'bg-success' : 'bg-warning'
                              }`}>
                                {order.paymentStatus || 'Unpaid'}
                              </span>
                            </td>
                            <td>
                              <small className="text-muted" style={{maxWidth: '200px', display: 'block'}}>
                                {order.userAddress || 'N/A'}
                              </small>
                            </td>
                            <td>
                              <button
                                className="btn btn-sm btn-danger"
                                onClick={() => handleDeleteOrder(order.id)}
                                title="Delete order"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
