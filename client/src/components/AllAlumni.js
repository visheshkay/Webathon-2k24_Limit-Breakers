import React from 'react'
import AlumniCard from './AlumniCard'
import {useState,useEffect} from 'react'
import axios from 'axios'
function AllAlumni() {
    const token = localStorage.getItem('token')
    const [alumni,setAlumni]=useState([])
    const [filteredAlumni,setFilteredAlumni]=useState([])
    const axiosWithToken = axios.create({
        headers:{Authorization: `Bearer ${token}`}
    })
    const getAl= async ()=>{
        let res = await axiosWithToken.get('http://localhost:4000/student-api/alumni');
        setAlumni(res.data.payload)
        setFilteredAlumni(res.data.payload)
        console.log(alumni)
    }
    const [expanded, setExpanded] = useState(false);
  const [filters, setFilters] = useState({
    artificialIntelligence: false,
    webDevelopment: false,
    mobileDevelopment: false,
    dataScience: false,
    cyberSecurity: false,
    cloudComputing: false
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setFilters(prevFilters => ({
      ...prevFilters,
      [name]: checked
    }));
  };

  const applyFilters = () => {
    const filtered = alumni.filter(alumnus => {
      return (
        (!filters.artificialIntelligence || alumnus.artificialIntelligence) &&
        (!filters.webDevelopment || alumnus.webDevelopment) &&
        (!filters.mobileDevelopment || alumnus.mobileDevelopment) &&
        (!filters.dataScience || alumnus.dataScience) &&
        (!filters.cyberSecurity || alumnus.cyberSecurity) &&
        (!filters.cloudComputing || alumnus.cloudComputing)
      );
    });

    setFilteredAlumni(filtered);
  };

  const clearFilters = () => {
    setFilters({
      artificialIntelligence: false,
      webDevelopment: false,
      mobileDevelopment: false,
      dataScience: false,
      cyberSecurity: false,
      cloudComputing: false
    });
    setFilteredAlumni(alumni);
  };
    useEffect(()=>{
        getAl()
    },[])
    return (
        <div className="pt-5 mx-auto">
            <div  style={{padding:"2rem"}}>
            <button onClick={toggleExpand} style={{ padding: '5px' ,backgroundColor:"var(--main-yellow)"}} className="btn  text-dark fs-5">
        {expanded ? 'Close Filters' : 'Expand Filters'}
      </button>
      {expanded && (
        <div>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="artificialIntelligence"
              checked={filters.artificialIntelligence}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Artificial Intelligence
          </label>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="webDevelopment"
              checked={filters.webDevelopment}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Web Development
          </label>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="mobileDevelopment"
              checked={filters.mobileDevelopment}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Mobile Development
          </label>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="dataScience"
              checked={filters.dataScience}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Data Science
          </label>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="cyberSecurity"
              checked={filters.cyberSecurity}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Cyber Security
          </label>
          <label style={{ padding: '5px' }}>
            <input
              type="checkbox"
              name="cloudComputing"
              checked={filters.cloudComputing}
              onChange={handleChange}
              style={{ marginRight: '5px' }}
            />
            Cloud Computing
          </label>
          <div className="">
            <div className="d-inline m-2">
          <button onClick={applyFilters} style={{ padding: '5px' ,backgroundColor:"var(--light-green)"}} className="btn  text-dark fs-5">Apply Filters</button>
          </div>
          <div className="d-inline m-2">
          <button onClick={clearFilters} style={{ padding: '5px' ,backgroundColor:"var(--light-red)"}} className="btn  text-dark fs-5">Clear Filters</button>
          </div>
          </div>
        </div>
      )}
            </div>
            <div className="row gy-5 gx-3">
            {filteredAlumni.map((a)=><div className="col-sm-12 col-md-4 col-lg-3 mb-2"><AlumniCard a={a}/></div>)}
        </div>
        </div>
    )
}

export default AllAlumni
