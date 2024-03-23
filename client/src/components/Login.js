import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { studentAlumniLoginThunk } from '../redux/slices/studentAlumniSlice'
import { useEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux'

import './Login.css'
function Login() {
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let {register,handleSubmit,formState:{errors}}=useForm()
    let{loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.studentAlumniLoginReducer)
    const login = async(user)=>{
        console.log(user)
        dispatch(studentAlumniLoginThunk(user))
    }
    useEffect(()=>{
        
        if(loginUserStatus===true){
            if(currentUser.userType==='alumni'){
                navigate('/alumni')
            }
            else{
                navigate('/student')
            }
        }
    },[loginUserStatus])
    return(
        <div className="signinmain">
            <h1 className="text-center  display-4 pt-3 font-weight-bold" style={{fontWeight:"500"}}>Login</h1>
            <form className="w-50 mx-auto p-4 pt-3 bg-light" onSubmit={handleSubmit(login)}>
                    <div className="radiobut">
                    <input type="radio" id="user" name="userType" value="student" checked="checked" {...register("userType")}/>
                    <label for="user">Student</label>
                    <input type="radio" id="author" name="userType" value="alumni" {...register("userType")}/>
                    <label for="author">Alumni</label>
                    </div>
                    <div className="uname mb-2">
                    <label htmlFor="uname" className="form-label">Username</label>
                    <input type="text" id="uname" className="form-control w-75 mx-auto" {...register("username",{required:true})}/>
                    {errors.uname && errors.username.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="password mb-2">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" id="pass" className="form-control w-75 mx-auto" {...register("password",{required:true})}/>
                    {errors.password?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <button className="btn  text-dark mx-auto d-block fs-5" style={{backgroundColor:"var(--main-yellow)"}}>Login</button>        
            </form>
            <p className="lead text-center mt-2">New User?
            <Link to="/new-user" className="fs-4 px-3">Register</Link>
            here
            </p>
        </div>
    )
}

export default Login
