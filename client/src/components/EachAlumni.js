import React from 'react'
import { useLocation } from 'react-router-dom'
function EachAlumni() {
    let {state}=useLocation()
    return (
        <div style={{paddingTop:"2rem"}}>
            <h2>Alumni</h2>
      <h4>Username: {state.username}</h4>
      <p><strong>Branch:</strong> {state.branch}</p>

      <h3>Skills:</h3>
      <ul>
        {Object.entries(state).map(([key, value]) => {
          // Check if the key is a skill (boolean value)
          if (typeof value === 'boolean' && value) {
            // Convert the key to a readable format (remove camelCase and capitalize words)
            const skillName = key.replace(/([A-Z])/g, ' $1').trim();
            return <li key={key}>{skillName}</li>;
          }
          return null; // Skip if it's not a skill or the skill is false
        })}
      </ul>
      <p><strong>Contact via Email: </strong> <span >{state.email}</span></p>
        </div>
    )
}

export default EachAlumni
