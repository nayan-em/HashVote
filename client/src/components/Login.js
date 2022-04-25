import { Link, useNavigate } from 'react-router-dom'
import { useState } from "react"
import axios from "axios"
import voteImage from '../img/vote.webp'
import "./Login.css"

function Login() {

  const navigate = useNavigate()

  const [id, setId] = useState("")
  const [pass, setPass] = useState("")
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const handleSubmit = () => {
    axios.get("/user", {
      params: {
        id: id,
        password: pass
      }
    })
    .then(res => {
      setErrorMessage(res.data)
      console.log(errorMessage);
      if(res.data === "Account verified successfully!") navigate("/home/"+id)
      setShowError(true)
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
            <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 mb-5">
              <form>
                <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-start mb-5">
                  <p className="h3 fw-normal mb-3 me-3">Login and start voting!</p>
                </div>

                <div className={'h6 text-danger mb-3 '+(showError?'':'d-none')}>{errorMessage}</div>

                {/* College Id input */}
                <div className="form-outline mb-4">
                  <input type="email" id="form3Example3" className="form-control form-control-lg"
                    placeholder="Enter college id" value={id} onChange={(e) => {setId(e.target.value)}}/>
                </div>

                {/* Password input */}
                <div className="form-outline mb-5">
                  <input type="password" id="form3Example4" className="form-control form-control-lg"
                    placeholder="Enter password" value={pass} onChange={(e) => {setPass(e.target.value)}}/>
                </div>

                {/* <div className="d-flex justify-content-between align-items-center">
                  <div className="mb-0" />
                  <a href="#!" className="text-body">Forgot password?</a>
                </div> */}

                <div className="text-center text-lg-start mt-5 pt-2">
                  <button type="button" className="btn btn-primary btn-lg" onClick={handleSubmit}>Login</button>
                  <p className="small fw-bold mt-2 pt-1 mb-0">Don't have an account?
                  <Link to={"/register"}>
                    <a href="#!" className="link-danger ms-2">Register</a>
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
    </>
  )
}

export default Login