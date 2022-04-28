import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import { Accordion, Modal, Form, Button } from 'react-bootstrap'
import NavigatePoll from "./NavigatePoll.js";
import background from '../img/background.jpg'

const Poll = () => {

  const navigate = useNavigate()
  const { id, pollId } = useParams()
  const regex = /^\s*$/

  const [candidates, setCandidates] = useState([])
  const [user, setUser] = useState([])
  const [poll, setPoll] = useState([])
  const [name, setName] = useState("")
  const [desc, setDesc] = useState("")
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [show, setShow] = useState(false)
  const [showZKP, setShowZKP] = useState(false)
  const [secretKey, setSecretKey] = useState("")
  const [votedCand, setVotedCand] = useState([])

  const [isNameEmpty, setIsNameEmpty] = useState(false)
  const [isDescEmpty, setIsDescEmpty] = useState(false)

  useEffect(() => {
    axios.get("/candidate", {
      params: {
        id: pollId
      }
    })
    .then(res => setCandidates(res.data))

    axios.get("/getUser", {
      params: {
        id: id
      }
    })
    .then(res => setUser(res.data))

    axios.get("/getPoll", {
      params: {
        id: pollId
      }
    })
    .then(res => setPoll(res.data[0]))
  }, [])

  const handleClose = () => {
    setName("")
    setDesc("")
    setIsNameEmpty(false)
    setIsDescEmpty(false)
    setShow(false)
    setShowMessage(false)
    setShowZKP(false)
  }

  const handleSubmitCand = () => {
    if (name.match(regex) != null) {
      setIsNameEmpty(true)
      return
    }
    else setIsNameEmpty(false)

    if (desc.match(regex) != null) {
      setIsDescEmpty(true)
      return
    }
    else setIsDescEmpty(false)

    axios.post("/candidate", {}, {
      params: {
        id: pollId,
        name: name,
        desc: desc
      }
    })
    .then(res => {
      navigate(0)
    })
  }

  const handleSubmitZKP = () => {
    const candId = votedCand[0]
    const candName = votedCand[1]

    axios.get("/zkp", {
      params: {
        secretKey
      }
    })
    .then(res => {
      setShowZKP(false)
        if(res.data == "ZKP result: VERIFICATION SUCCESSFULLY COMPLETE"){
          axios.post("/vote", {}, {
            params: {
              voterId: user[0],
              voterName: user[1],
              candId,
              candName,
              pollId: poll[0],
              pollName: poll[1],
            }
          })
          .then(res => {
            setMessage(res.data)
            setShowMessage(true)
          })
        }
        else{
          console.log("Sorry, couldn't verify the identity")
        }
    })
  }

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
    <>
      <div class="bg bg-image" style={sectionStyle}> 

      <NavigatePoll userId={id} pollId={pollId}/>
      <br />

      <div className="jumbotron m-2 my-5">
        <div className="container text-center">
          <h1>Hash Vote</h1>
          <p>a blockchain based online voting system</p>
        </div>
      </div>
      <br />

      <div className="container mt-5 mb-4">
        <div className='row justify-content-center'>
          <div className="col-7 h4">Candidates</div>
          {/* <button className="col-2 me-3 btn btn-danger" onClick={handleCountVotes}>Count Votes</button> */}
          <button className="col-2 btn btn-danger" onClick={() => setShow(true)}>Add Candidate</button>
        </div>
      </div>

      <div className="container">
        <div className='row m-5'>
          {candidates.map(x => {
            return (
              <div className="col-4 mb-3">
                <Accordion>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>{x[2]}</Accordion.Header>
                    <Accordion.Body>
                      <div className='text-muted mb-2'>{x[3]}</div>
                      <button className="btn btn-success mt-2 " onClick={() => {setVotedCand([x[0], x[2]]); setShowZKP(true)}}>Vote</button>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            )
          })}
        </div>
      </div>


      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Candidate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Enter Name" required autoFocus/>
              <div className={"text-danger mt-2 " + (isNameEmpty ? "" : "d-none")}> Title can not be empty!</div>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <textarea className="form-control" rows="3" value={desc} onChange={e => setDesc(e.target.value)} placeholder="Enter description"/>
              <div className={"text-danger mt-2 " + (isDescEmpty ? "" : "d-none")}> Desc can not be empty!</div>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitCand}>Add</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showMessage} onHide={() => setShowMessage(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Message</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={() => setShowMessage(false)}>Close</button>
        </Modal.Footer>
      </Modal>

      <Modal show={showZKP} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>ZKP Verification</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Voter ID</Form.Label>
              <Form.Control type="password" value={secretKey} onChange={e => setSecretKey(e.target.value)} placeholder="Enter you voter id" required autoFocus />
              {/* <div className={"text-danger mt-2 " + (showError ? "" : "d-none")}>Could not verify voter!</div> */}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleClose}>Close</button>
          <button className="btn btn-primary" onClick={handleSubmitZKP}>Submit</button>
        </Modal.Footer>
      </Modal>
     
      </div>
    </>
  )
}

export default Poll