import React, { useState } from 'react'
import { useAdminAuth } from '../../context/AdminAuthContext'
import './Login.css'

export default function Login() {
  const { login } = useAdminAuth()
  const [formData, setFormData] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setIsSubmitting(true)
    try {
      await login(formData.username.trim(), formData.password)
    } catch (err) {
      setError(err.message || 'Login failed')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <div className="admin-login-header">
          <div className="logo">Foodies Admin</div>
          <p>Exclusive access for authorized administrators only.</p>
        </div>
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              className="form-control"
              placeholder="Enter admin username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              className="form-control"
              placeholder="Enter admin password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          {error && (
            <div className="alert alert-danger py-2" role="alert">
              {error}
            </div>
          )}
          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Verifying…' : 'Sign in'}
          </button>
          <p className="login-note">Session stays active for 24 hours or until you sign out.</p>
        </form>
      </div>
    </div>
  )
}

