import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react"
import axios from "axios"
import Card from './Card.js'
import Navbar from "./Navbar.js";
import background from '../img/background.jpg'

function Home() {

  const { id } = useParams()
  const [items, setItems] = useState([])

  useEffect(() => {
    axios.get("/allPolls")
    .then(res => {
      console.log(res.data);
      setItems(res.data)})
  }, [])

  var sectionStyle = {
    backgroundImage: `url(${background})`,
    height: "100vh",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover"
  }


  return (
    <div class="bg-image" style={sectionStyle}>
      <Navbar userId={id}/>
      <br />
      
      <div className="styledimg">
      <div className="jumbotron m-2 my-5">
        <div className="container text-center">
          <h1>Hash Vote</h1>
          <p>a blockchain based online voting system</p>
        </div>
      </div>
      </div>
      
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="container mt-5">
              <div className="row">
                {items.map(item => {
                  return (
                    <div className="col-4 mb-5 d-flex justify-content-center">
                      <Link to={`/poll/${id}/${item[0]}`} className="text-decoration-none">
                        <Card
                          key={item[0]}
                          name={item[1]}
                          desc={item[2]}
                        />
                      </Link>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      
      </div>
  )
}

export default Home