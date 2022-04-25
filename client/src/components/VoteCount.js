import { useState, useEffect } from "react"
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import axios from "axios";
// import Navbar from "./Navbar";
import background from '../img/background.jpg'
import NavigatePoll from "./NavigatePoll";


const VoteCount = () => {

  const location = useLocation()
  const userId = location.state.userId
  const pollId = location.state.pollId

  const [candidates, setCandidates] = useState([])
  const [result, setResult] = useState([])

  useEffect(() => {
    axios.get('/countVotes', {
      params: {
        pollId: pollId
      }
    })
      .then(res => {
        console.log(res.data["votes"])
        setCandidates(res.data["candidates"])
        setResult(res.data["votes"])
      })
  }, [])


  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100%",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
    <>
      <div class="bg-image" style={sectionStyle}>
        <NavigatePoll userId={userId} pollId={pollId} />
        <br />

        <div className="m-2 my-5">
          <div className="container text-center">
            <h1>Hash Vote</h1>
            <p>a blockchain based online voting system</p>
          </div>
        </div>
        <br />

        <div className="container mt-5">
          <div className="row justify-content-center">
            <div className="col-8">
              <ul class="list-group list-group-flush ">
                {candidates.map((candidate, index) => {
                  return (
                    <li class="list-group-item bg-transparent">
                      <div className="col-12 mb-3 p-4">
                        <div className="row mx-2 justify-content-center">
                          <div className="col-5 ms-5"><strong>Candidate Name</strong></div>
                          <div className="col-2 text-muted">{candidate[2]}</div>
                        </div>

                        <div className="row m-2 mb-0 justify-content-center">
                          <div className="col-5 ms-5"><strong>Votes</strong></div>
                          <div className="col-2 mb-2 text-muted">{result[index]}</div>
                        </div>
                      </div>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default VoteCount