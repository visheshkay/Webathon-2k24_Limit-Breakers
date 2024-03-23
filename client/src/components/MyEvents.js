import React from 'react'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import EventCard from './EventCard'
function MyEvents() {
    let {loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.studentAlumniLoginReducer)
    const token = localStorage.getItem('token')
    const [myEvents,setMyEvents]=useState([])
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    }) 

    const getArt= async ()=>{
        let res = await axiosWithToken.get(`http://localhost:4000/alumni-api/eventa/user-event/${currentUser.username}`);
        setMyEvents(res.data.payload)
        console.log(myEvents)
    }

    useEffect(()=>{
        getArt()
    },[])
    return (
        <div className="" style={{ margin: '2rem'}}>
        <div className="row gy-5 gx-3">
            {myEvents.map((a)=><div className="col-sm-12 col-md-4 col-lg-3 mb-2"><EventCard a={a}/></div>)}
        </div>
        </div>
    )
}

export default MyEvents
