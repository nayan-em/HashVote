import Modal from 'react-bootstrap/Modal'
import Form from 'react-bootstrap/Form'
import axios from 'axios'
import { useState } from "react"
import { useNavigate, useParams, Link } from 'react-router-dom';

function NavigatePoll({ userId, pollId }) {

  const navigate = useNavigate()
  const regex = /^\s*$/

  const [show, setShow] = useState(false)
  const [showBlockchain, setShowBlockchain] = useState(false)
  const [showError, setShowError] = useState(false)
  const [password, setPassword] = useState("")
  const [title, setTitle] = useState("")
  const [desc, setDesc] = useState("")
  const [isTitleEmpty, setIsTitleEmpty] = useState(false)
  const [isDescEmpty, setIsDescEmpty] = useState(false)

  const handleShow = () => setShow(true)

  const handleClose = () => {
    setTitle("")
    setDesc("")
    setIsTitleEmpty(false)
    setIsDescEmpty(false)
    setShowBlockchain(false)
    setShowError(false)
    setShow(false)
  }

  const handleSubmit = () => {
    if (title.match(regex) != null) {
      setIsTitleEmpty(true)
      return
    }
    else setIsTitleEmpty(false)

    if (desc.match(regex) != null) {
      setIsDescEmpty(true)
      return
    }
    else setIsDescEmpty(false)

    axios.post("/poll", {}, {
      params: {
        name: title,
        desc: desc
      }
    })
      .then(res => {
        console.log(res.data)
        navigate(0)
      })
  }

  const handleViewTrans = () => {
    axios.get("/viewTrans", {
      params: {
        userId: userId
      }
    })
      .then(res => {
        navigate('/viewTrans', {
          state: {
            userId: userId,
            blocks: res.data
          }
        })
      })
  }

  const handleCountVotes = () => {
    navigate('/countVotes', {
      state: {
        userId: userId,
        pollId: pollId
      }
    })
  }

  const handleSubmitPass = () => {
    if(password === "admin123")
      navigate('/viewBlockchain', {
        state: {
          userId: userId,
        }
      })
    else{
      setShowError(true)
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light shadow-5-strong pt-3">
        <div className="container">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand mt-2 mt-lg-0 text-muted" href="#">HashVote
            </a>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleCountVotes}>Count Votes</div>
              </div>

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleShow}>Create Poll</div>
              </div>

              <div className="nav-item me-4" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={handleViewTrans}>Transactions</div>
              </div>

              <div className="nav-item" style={{ "cursor": "pointer" }}>
                <div className="nav-link" onClick={() => setShowBlockchain(true)}>Blockchain</div>
              </div>

            </ul>
          </div>
        </div>
      </nav>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Poll</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Enter Title" required autoFocus />
              <div className={"text-danger mt-2 " + (isTitleEmpty ? "" : "d-none")}> Title can not be empty!</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea className="form-control" rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter description" />
              <div className={"text-danger mt-2 " + (isDescEmpty ? "" : "d-none")}> Desc can not be empty!</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmit}>Create Poll</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showBlockchain} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Admin Authentication</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter Admin Password" required autoFocus />
              <div className={"text-danger mt-2 " + (showError ? "" : "d-none")}>Incorrect Password!</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitPass}>Submit</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default NavigatePoll