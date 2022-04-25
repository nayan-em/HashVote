import { useState } from "react"
import { useNavigate } from "react-router-dom"

const Page1 = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [noOfCand, setNoOfCand] = useState(0)
  const [desc, setDesc] = useState("")

  const handleTitle = e => setTitle(e.target.value)
  const handleNoOfCand = e => setNoOfCand(e.target.value)
  const handleDesc = e => setDesc(e.target.value)

  return (
    <>
      <div className="row justify-content-md-center align-items-center mt-5">
        <div className="col-md-2 text-center">Title</div>
        <div className="col-md-4 text-center">
          <div className="form-group">
            <input type="text" className="form-control" required={true} placeholder="Enter title" value={title} onChange={handleTitle} />
          </div>
        </div>
      </div>

      <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">Number of candidates</div>
        <div className="col-md-4 text-center">
          <div className="form-group">
            <input
              type="number" min="0" max="10" required={true}
              className="form-control" placeholder="Enter a number less than 10"
              value={noOfCand} onChange={handleNoOfCand}
            />
          </div>
        </div>
      </div>

      <div className="row justify-content-md-center align-items-center mt-4">
        <div className="col-md-2 text-center">Description</div>
        <div className="col-md-4 text-center">
          <div className="form-group">
            <textarea className="form-control" rows="3" placeholder="Enter description" value={desc} onChange={handleDesc} />
          </div>
        </div>
      </div>
    </>
  )
}

export default Page1