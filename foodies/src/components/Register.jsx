import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { registerUser } from '../services/UserService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value })
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
          await registerUser(formData)
          toast.success('Registration successful')
          navigate('/login')
        } catch (error) {
          toast.error('Registration failed')
        } finally {
          setFormData({ name: '', email: '', password: '' })
        }
      }
      
    const handleReset = (e) => {
        e.preventDefault()
        setFormData({ name: '', email: '', password: '' })
    }
  return (
    <>  {/* Login Form */}
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input type="text" className="form-control" id="name" placeholder="name@example.com" value={formData.name} onChange={handleChange}/>
                  <label htmlFor="name">Name</label>
                </div>
                <div className="form-floating mb-3">
                  <input type="email" className="form-control" id="email" placeholder="name@example.com" value={formData.email} onChange={handleChange}/>
                  <label htmlFor="email">Email address</label>
                </div>  
                <div className="form-floating mb-3">
                  <input type="password" className="form-control" id="password" placeholder="Password" value={formData.password} onChange={handleChange}/>
                  <label htmlFor="password">Password</label>
                </div>
  
                <div className="d-grid">
                  <button className="btn btn-outline-primary text-uppercase w-100" type="submit">Sign
                    up</button>
                </div>
                <button className="btn btn-outline-danger text-uppercase mt-2 w-100" type="reset" onClick={handleReset}>Reset</button>
                <div className="mt-4">
                  <p>Already have an account? <Link to="/login">Sign In</Link></p>
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

export default Register
