import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from "axios"
import Modal from 'react-bootstrap/Modal'
import voteImage from '../img/vote.webp'
import "./Login.css"

function Login() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [id, setId] = useState("")
  const [pass, setPass] = useState("")
  const [showError, setShowError] = useState(false)

  // Modal controls
  const [showModal, setShowModal] = useState(false)
  const handleClose = () => {
    setShowModal(false)
    navigate("/")
  }

  let errorMessage = ""

  const handleSubmit = () => {
    axios.post("/user", {}, {
      params: {
      id: id,
      name: name,
      password: pass
    }})
    .then(res => {
      errorMessage = res.data
      setShowModal(true)
    })
  }

  return (
    <>
      <section className="vh-100">
        <div className="container-fluid h-custom">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-md-9 col-lg-6 col-xl-5">
              <img src={voteImage}
                className="img-fluid" alt="Sample image" />
            </div>
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-4">
                  <p className="h3 fw-normal mb-3 me-3">Register and start voting!</p>
                </div>

                <div className={'h6 text-danger mb-3 '+(showError?'':'d-none')}>{errorMessage}</div>

                {/* Name input */}
                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="Enter full name" value={name} onChange={(e) => {setName(e.target.value)}}/>
                </div>

                {/* College Id input */}
                <div className="form-outline mb-4">
                  <input type="text" className="form-control form-control-lg"
                    placeholder="Enter college id" value={id} onChange={(e) => {setId(e.target.value)}}/>
                </div>

                {/* Password input */}
                <div className="form-outline mb-3">
                  <input type="password" className="form-control form-control-lg"
                    placeholder="Enter a strong password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                </div>

                <div className="text-center text-lg-start mt-5 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Submit</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Already have an account?
                  <Link to={"/login"}>
                    <a href="#!" className="link-danger ms-2">Login</a>
                  </Link>
                  </p>
                </div>

              </form>
            </div>
          </div>
        </div>
        
        <div
          className="d-flex flex-column flex-md-row text-center text-md-start justify-content-between py-4 px-4 px-xl-5 bg-primary">
          {/* Copyright */}
          <div className="text-white mb-3 mb-md-0">
            Copyright © 2020. All rights reserved.
          </div>
          {/* Copyright */}

        </div>
      </section>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>Account created successfully!</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>
            Close
          </button>
          <button className="btn btn-primary" onClick={handleClose}>
            OK
          </button>
        </Modal.Footer>
      </Modal>

    </>
  )
}

export default Login