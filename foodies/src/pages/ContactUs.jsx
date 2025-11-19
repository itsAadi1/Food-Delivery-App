import React from 'react'
import { useState } from 'react'
import { assets } from '../assets/assets'
const ContactUs = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(name, email, message)
  }
  return (
    <section id="contact" className="py-5">
    <div className="container px-4 px-lg-5">
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 col-xl-6 text-center">
                <h2 className="mt-0">Let's Get In Touch!</h2>
                <hr className="divider" />
                <p className="text-muted mb-5">Ready to start your next project with us? Send us a message and we will get
                    back to you as soon as possible!</p>
            </div>
        </div>
        <div className="row gx-4 gx-lg-5 justify-content-center mb-5">
            <div className="col-lg-6">
                <form onSubmit={handleSubmit}>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="name" type="text" placeholder="Enter your name..." required />
                        <label htmlFor="name">Full name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input className="form-control" id="email" type="email" placeholder="name@example.com" required />
                        <label htmlFor="email">Email address</label>
                    </div>
                    <div className="form-floating mb-3">
                        <textarea className="form-control" id="message" type="text" placeholder="Enter your message here..." style={{height: '10rem'}} required></textarea>
                        <label htmlFor="message">Message</label>
                    </div>
                    <div className="d-grid"><button className="btn btn-primary btn-xl" type="submit">Submit</button></div>
                </form>
            </div>
        </div>
        <div className="row gx-4 gx-lg-5 justify-content-center">
            <div className="col-lg-8 text-center">
                <div className="d-flex justify-content-center gap-3 mt-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <img src={assets.facebook_icon} alt="Facebook" style={{height: '40px', width: '40px'}} />
                    </a>
                    <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <img src={assets.twitter_icon} alt="Twitter" style={{height: '40px', width: '40px'}} />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-decoration-none">
                        <img src={assets.linkedin_icon} alt="LinkedIn" style={{height: '40px', width: '40px'}} />
                    </a>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default ContactUs
