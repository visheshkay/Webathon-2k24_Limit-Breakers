import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router';
function DisCard(props) {
    let navigate = useNavigate()
    return (
        <div className="eacharticle">
<Link onClick={(e)=>{
    e.preventDefault();
    navigate(`/discussion/${props.a.disId}`,{state:props.a});
}} style={{ textDecoration: 'none' }}>
            <div className="card article1">
  <div className="card-body" >
      <div className="titlecov">
    <h5 className="card-title" style={{textDecoration: 'none'}}>{props.a.title}</h5>
    </div>
    <h3 className="card-text" style={{textDecoration: 'none'}}>{props.a.category}</h3>
    <div>
    <p className="card-text">
                {props.a.content.substring(0, 60) + "...."}
    </p>
    </div>
    <p>Click to read</p>
  </div>
</div>
</Link>
        </div>
    )
}

export default DisCard
