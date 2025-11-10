import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { loginUser } from '../services/UserService.js'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { StoreContext } from '../context/StoreContext'
const Login = () => {
  const { setToken, setUserEmail } = useContext(StoreContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await loginUser(formData)
      if (response && response.token) {
        setToken(response.token)
        // Store user email from response or form data
        const emailToStore = response.email || formData.email
        if (emailToStore && setUserEmail) {
          setUserEmail(emailToStore)
        }
        if (emailToStore) {
          localStorage.setItem('userEmail', emailToStore)
        }
        toast.success('Login successful')
        navigate('/')
      } else {
        toast.error('Login failed: Invalid response from server')
      }
    } catch (error) {
      console.error('Login error:', error)
      const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please check your credentials.'
      toast.error(errorMessage)
    } finally {
      setFormData({ email: '', password: '' })
    }
  }
  const handleReset = (e) => {
    e.preventDefault()
    setFormData({ email: '', password: '' })
  }
  return (
    <>  {/* Login Form */}
  <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form onSubmit={handleSubmit}>
              <div className="form-floating mb-3">
                <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange}/>
                <label htmlFor="email">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                <label htmlFor="password">Password</label>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                <label className="form-check-label" htmlFor="rememberPasswordCheck">
                  Remember password
                </label>    
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-primary text-uppercase w-100" type="submit">Sign
                  in</button>
                </div>
                <button className="btn btn-outline-danger text-uppercase mt-2 w-100" type="button" onClick={handleReset}>Reset</button>
                <div className="mt-4">
                  <p>Don't have an account? <Link to="/register">Sign Up</Link></p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default Login
