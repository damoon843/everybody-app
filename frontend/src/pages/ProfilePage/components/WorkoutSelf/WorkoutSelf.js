import React from 'react'; 
import './WorkoutSelf.css';

function WorkoutSelf(props){
  return (
    <div className="workout-self">
      <h4>{props.name}</h4>
      <div className="workout-poster">
        <h5>{props.postingUser}</h5>
      </div>
      <p>Description: {props.description}</p>
    </div>
  );
}
export default WorkoutSelf