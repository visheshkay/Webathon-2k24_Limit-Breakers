import React from 'react'
import { useSelector } from "react-redux";
function AlumniProfile() {
    let {loginUserStatus,currentUser,errorOccured,errMsg}=useSelector(state=>state.studentAlumniLoginReducer)
    return (
        <div style={{paddingTop:"2rem"}}>
            <h2>Alumni Profile</h2>
      <p><strong>Username:</strong> {currentUser.username}</p>
      <p><strong>Email:</strong> {currentUser.email}</p>
      <p><strong>Branch:</strong> {currentUser.branch}</p>
      <p><strong>User Type:</strong> {currentUser.userType}</p>

      <h3>Skills:</h3>
      <ul>
        {Object.entries(currentUser).map(([key, value]) => {
          // Check if the key is a skill (boolean value)
          if (typeof value === 'boolean' && value) {
            // Convert the key to a readable format (remove camelCase and capitalize words)
            const skillName = key.replace(/([A-Z])/g, ' $1').trim();
            return <li key={key}>{skillName}</li>;
          }
          return null; // Skip if it's not a skill or the skill is false
        })}
      </ul>
        </div>
    )
}

export default AlumniProfile
