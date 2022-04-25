import logo from '../img/showcase.jpg'
import './Card.css'

const Card = ({name, desc}) => {

    return (
        <div className="card bg-light" style={{width:"20rem"}}>
            <img id="imageContainer" src={logo} className="card-img-top" alt="..." />
            <div className="card-body text-center card-title h5">
                <div className="h4 text-danger mb-3">{name}</div>
                <div className="row">
                    <div className="col h6 text-black">{desc}</div>
                </div>
            </div>
        </div>
    )
}

export default Card