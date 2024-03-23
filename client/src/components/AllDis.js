import React from 'react'
import {useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import axios from 'axios'
import DisCard from './DisCard'
function AllDis() {
    const token = localStorage.getItem('token')
    let { currentUser } = useSelector(
        (state) => state.studentAlumniLoginReducer
      );
    const [dis,setDis]=useState([])
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    }) 
    const getArt= async ()=>{
        let res;
        if(currentUser.userType==='student'){
        res = await axiosWithToken.get(`http://localhost:4000/student-api/discussions`);
        }
        else{
            res = await axiosWithToken.get(`http://localhost:4000/alumni-api/discussions`);
        }
        setDis(res.data.payload)
        console.log(dis)
    }

    useEffect(()=>{
        getArt()
    },[])
    return (
        <div className="" style={{ margin: '2rem'}}>
        <div className="row gy-5 gx-3">
            {dis.map((a)=><div className="col-sm-12 col-md-4 col-lg-3 mb-2"><DisCard a={a}/></div>)}
        </div>
        </div>
    )
}

export default AllDis
