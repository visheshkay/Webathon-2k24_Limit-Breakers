import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
import './AlumniCard.css'
function AlumniCard(props) {
    let navigate = useNavigate()
    return (
        <div>
            <div className="eacharticle">
<Link onClick={(e)=>{
    e.preventDefault();
    navigate(`/alumni/${props.a.username}`,{state:props.a});
}} style={{ textDecoration: 'none' }}>
            <div className="card article1">
  <div className="card-body" >
      <div className="titlecov">
    <h5 className="card-title" style={{textDecoration: 'none'}}>{props.a.username}</h5>
    </div>
    <h3 className="card-text" style={{textDecoration: 'none'}}>{props.a.branch}</h3>
    <p>Click for more details</p>
  </div>
</div>
</Link>
        </div>
        </div>
    )
}

export default AlumniCard
