import React from 'react'
import { useLocation } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
function MainEvent() {
    let {loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.studentAlumniLoginReducer)
    let {state}=useLocation()
    const token = localStorage.getItem('token')
    let [comment,setComment]= useState("");
    let {register,handleSubmit,formState:{errors }}=useForm();
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    })
    function ISOtoUTC(iso){
        let date = new Date(iso).getUTCDate();
        let day = new Date(iso).getUTCDay();
        let year = new Date(iso).getUTCFullYear();
        return `${date}/${day}/${year}`;
    }
    const commentHandle = async (commentObj)=>{
        commentObj.username = currentUser.username;
        let res;
        if(currentUser.userType==='student'){
            res = await axiosWithToken.post(`http://localhost:4000/student-api/event/comment/${state.eventId}`,commentObj);
}
        else{
        res = await axiosWithToken.post(`http://localhost:4000/alumni-api/event/comment/${state.eventId}`,commentObj);
}
        if(res.data.message==='Comment Posted'){
            setComment(res.data.message);
        }
    }
    return (
        <div>
            <div className="d-flex justify-content-between m-5">
            <div>
                <p className="display-3 me-4">{state.title}</p>
                <span>
                <small className="text-secondary me-4">
                    Created on: {ISOtoUTC(state.dateOfCreation)}
                </small>
                <small className="text-secondary me-4">
                    Modified on: {ISOtoUTC(state.dateOfModification)}
                </small>
                </span>
            </div>
        </div>
        <p className="display-5 me-4">{state.cat}</p>
        <p className="lead mt-3" style={{whiteSpace:'pre-line'}}>{state.content}</p>
        <div>
            <div className="comments my-4">
                {state.comments.length===0?
                (<p className="display-6">No comments...</p>)
                :(
                    state.comments.map((commentObject,ind)=>{
                        return (
                            <div key={ind} className="bg-light p-3">
                                <p className="fs-4" style={{textTransform:"capitalize"}}>{commentObject.username}</p>
                                <p className="fs-4" style={{color:"dodgerblue"}}>{commentObject.comment}</p>
                            </div>
                        );
                    })
                )    
            }
            </div>
            </div>
            <h1>{comment}</h1>
                <form className="form m-3" onSubmit={handleSubmit(commentHandle)}>
                        <div className="">
                        <input type="text" className="form-control w-75 m-2" placeholder="Write a comment..." {...register("comment")}/>
                        </div>
                        <button type="submit" className="btn btn-submit" style={{backgroundColor:"var(--main-yellow)"}}>Add comment</button>
                </form>
        </div>
    )
}

export default MainEvent
