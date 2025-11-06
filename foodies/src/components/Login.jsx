import React from 'react'
import { Link } from 'react-router-dom'
const Login = () => {
  return (
    <>  {/* Login Form */}
  <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
            <form>
              <div className="form-floating mb-3">
                <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com"/>
                <label for="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" class="form-control" id="floatingPassword" placeholder="Password"/>
                <label for="floatingPassword">Password</label>
              </div>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck"/>
                <label className="form-check-label" for="rememberPasswordCheck">
                  Remember password
                </label>
              </div>
              <div className="d-grid">
                <button className="btn btn-outline-primary text-uppercase w-100" type="submit">Sign
                  in</button>
              </div>
              <button className="btn btn-outline-danger text-uppercase mt-2 w-100" type="reset">Reset</button>
              <div className="mt-4">
                <p>Already have an account? <Link to="/register">Sign Up</Link></p>
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
