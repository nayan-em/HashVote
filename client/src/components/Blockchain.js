import { useLocation } from 'react-router-dom';
import Navbar from "./Navbar";
import axios from 'axios'
import { useState, useEffect } from "react"

import background from '../img/background.jpg'

const Blockchain = () => {

  const location = useLocation();
  const userId = location.state.userId

  const [blocks, setBlocks] = useState([])

  useEffect(() => {
    axios.get("/viewBlockchain")
    .then(res => setBlocks(res.data))
    .catch(err => console.log(err))

  }, [])
  
  
  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }

  return (
    <>
    <div className="bg-image" style={sectionStyle}>
      <Navbar userId={userId}/>
      <br />

      <div className="jumbotron m-2 my-5">
        <div className="container text-center">
          <h1>Hash Vote</h1>
          <p>a blockchain based online voting system</p>
        </div>
      </div>
      <br />

      <div className="container">
        <div className='row m-5'>
          {blocks.map((block) => {
            return (
              <div className="col-12 mb-3 border border-secondary p-4">
                <div className="row m-2 justify-content-center">
                  <div className="col-3"><strong>Timestamp </strong></div>
                  <div className="col-9 text-muted">{block[1]}</div>
                </div>

                <div className="row m-2">
                  <div className="col-3"><strong>Hash of the Block </strong></div>
                  <div className="col-9 text-muted">{block[2]}</div>
                </div>

                <div className="row m-2">
                  <div className="col-3"><strong>Hash of the previous Block </strong></div>
                  <div className="col-9 text-muted">{block[3]}</div>
                </div>

                <div className="row m-2 mb-0">
                  <div className="col-3"><strong>Transactions</strong></div>
                  <div className="col-9 mb-2">
                    {block[4].map(trans => {
                      return(<div className='text-muted mb-2'>{trans}</div>)
                    })}
                  </div>
                </div>

                <div className="row justify-content-end">
                  <div className="col-2 h3">Block: {block[0]}</div>
                </div>

              </div>
            )
          })}
        </div>
      </div>
    </div>
    </>
  )
}

export default Blockchain