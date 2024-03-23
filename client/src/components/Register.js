import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import './Register.css'
function Register() {
    let {register,handleSubmit,formState:{errors}}=useForm()
    let [branch,setBranch]=useState('')
    let [skills,setSkills]=useState({
    AI: false,
    DataScience: false,
    WebDevelopment: false,
    MobileDevelopment: false,
    CloudComputing: false,
    CyberSecurity: false
  })
  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };
  const handleSkillsChange = (event) => {
    const { name, checked } = event.target;
    setSkills(prevSkills => ({
      ...prevSkills,
      [name]: checked
    }));
  };
    let navigate=useNavigate()
    async function registerUser(user){
        
        console.log(user)
        let res;
        if(user.userType==='student'){
         res = await axios.post('http://localhost:4000/student-api/student',user)
    }
    else{
         res = await axios.post('http://localhost:4000/alumni-api/alumni',user)
    }
        console.log(res.data)
        if(res.data.message==='User created' || res.data.message==='Alumni Registered'){
            navigate('/login')
        }
        else{
            console.log(res.data.message)
        }
    }
   
    return (
        <div className="signupmain">
            <h1 className="text-center display-4 pt-3" style={{fontWeight:"500"}}>Register</h1>
            <form className="w-50 mx-auto p-4 pt-3 bg-light" onSubmit={handleSubmit(registerUser)}>
                    <div className="radiobut">
                    <input type="radio" id="user" name="userType" value="student" checked="checked" {...register("userType")}/>
                    <label htmlFor="user">Student</label>
                    <input type="radio" id="author" name="userType" value="alumni" {...register("userType")}/>
                    <label htmlFor="author">Alumni</label>
                    </div>
                    <div className="uname mb-2">
                    <label htmlFor="uname" className="form-label">Username</label>
                    <input type="text" id="uname" className="form-control w-75 mx-auto" {...register("username",{required:true,minLength:4,maxLength:8})}/>
                    {errors.username && errors.username.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                    {errors.username && errors.username.type==="minLength" &&
                    (<p className="text-danger">Minimum Length: 4</p>)}
                    {errors.username && errors.username.type==="maxLength" &&
                    (<p className="text-danger">Maximum Length: 8</p>)}
                </div>
                <div className="password mb-2">
                    <label htmlFor="pass" className="form-label">Password</label>
                    <input type="password" id="pass" className="form-control w-75 mx-auto" {...register("password",{required:true,minLength:8})}/>
                    {errors.password?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                    {errors.password?.type==="minLength" &&
                    (<p className="text-danger">Minimum Length: 8</p>)}
                </div>
                <div className="email mb-2">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="email" id="email" className="form-control w-75 mx-auto" {...register("email",{required:true})}/>
                    {errors.email?.type==="required" &&
                    (<p className="text-danger">Required</p>)}
                </div>
                <div className="dropdown" className="p-2">
                <label htmlFor="branch">Select Branch:</label>
      <select id="branch" defaultValue={branch} onChange={handleBranchChange} {...register("branch")}>
        <option value="">Select</option>
        <option value="Computer Science">Computer Science</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Civil Engineering">Civil Engineering</option>
        {/* Add more options for other branches */}
      </select>
                </div>
                <label>Major Technical Skills:</label>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("artificialIntelligence")}  // Use camelCase for the input name
          />
          AI
        </label>
      </div>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("dataScience")} 
          />
          Data Science
        </label>
      </div>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("webDevelopment")} 
          />
          Web Development
        </label>
      </div>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("mobileDevelopment")} 
          />
          Mobile Development
        </label>
      </div>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("cloudComputing")} 
          />
          Cloud Computing
        </label>
      </div>
      <div>
        <label className="p-1">
          <input
            type="checkbox"
            {...register("cyberSecurity")}  
          />
          Cyber Security
        </label>
      </div>
                <button className="btn  text-dark mx-auto d-block fs-5" style={{backgroundColor:"var(--main-yellow)"}}>Register</button>
            </form>
            <p className="lead text-center mt-2">Already Registered?
            <Link to="/login" className="fs-4 ps-3">Login</Link>
            </p>
        </div>
    )
}

export default Register
