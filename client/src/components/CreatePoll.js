import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./CreatePoll.css"
import * as React from 'react'
import Page1 from "./Page1"
import Page2 from "./Page2"

const CreatePoll = () => {

  const navigate = useNavigate()

  const [title, setTitle] = useState("")
  const [noOfCand, setNoOfCand] = useState(0)
  const [desc, setDesc] = useState("")
  const [isNext, setIsNext] = useState(false)

  const handleTitle = e => setTitle(e.target.value)
  const handleNoOfCand = e => setNoOfCand(e.target.value)
  const handleDesc = e => setDesc(e.target.value)

  const handleBack = () => {
  }

  const handleCand = () => {

  }


  const handleSubmit = (e) => {
    // const server_url = 'http://' + REACT_APP_SERVER_IP + ':' + REACT_APP_PORT + '/item';
    // axios.post(server_url, {
    //   name: title,
    //   endTime: date,
    //   minBid: parseInt(minBid),
    //   description: desc,
    //   photo: image,
    //   category: category
    // })
    // .then(res => navigate(-1))
    // .catch(err => {
    //   console.log(err)
    //   navigate(-1)
    // })
  }


  const [inputFields, setInputFields] = useState([
    { firstName: '', lastName: '' }
  ]);
// const handleSubmit = e => {
//     e.preventDefault();
//     console.log("inputFields", inputFields);
//   };

  const handleInputChange = (index, event) => {
    const values = [...inputFields];
    if (event.target.name === "firstName") {
      values[index].firstName = event.target.value;
    } else {
      values[index].lastName = event.target.value;
    }

    setInputFields(values);
  };

  const handleAddFields = () => {
    const values = [...inputFields];
    values.push({ firstName: '', lastName: '' });
    setInputFields(values);
  };

  const handleRemoveFields = index => {
    const values = [...inputFields];
    values.splice(index, 1);
    setInputFields(values);
  };


  return (
    <>
      <div className="bg-image">
        <div className="dark-overlay text-light">
          {/* <Navbar/> */}
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center mt-5 h2">
                Create Your Poll !
              </div>
            </div>
            <div className="container">
              <form>

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

                <div className="row justify-content-md-center align-items-center mt-4">
                <div className="col-md-2 text-center">Candidates</div>
                  <div className="col-md-4 text-center">
                  <form onSubmit={handleSubmit}>
                    <div className="form-row justify-content-center">
                      {inputFields.map((inputField, index) => (
                        <React.Fragment key={`${inputField}~${index}`}>
                          <div className="row justify-content-center mb-1">
                          <div className="col-sm-9">
                            <input type="text" className="col-sm-8 form-control" onChange={e => handleInputChange(index, e)} />
                          </div>
                          <div className="col-sm-3 btn-group">
                            <button className="btn btn-black bg-light btn-block me-3" type="button" onClick={() => handleRemoveFields(index)}>-</button>
                            <button className="btn btn-black bg-light btn-block"type="button"onClick={() => handleAddFields()}>+</button>
                          </div>
                          </div>
                        </React.Fragment>
                      ))}
                    </div>
                  </form>
                  </div>
                </div>
                

                <div className="row justify-content-md-center align-items-center mt-4">
                  <div className="col-md-4 text-center mt-4">
                    {/* <button type="submit" className={"btn btn-success "+(isNext?"":"d-none")} onClick={handleBack}>Back</button> */}
                    <button type="submit" className="btn btn-success" onClick={() => setIsNext(true)}>Fill Candidate Details</button>
                  </div>
                </div>

              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreatePoll