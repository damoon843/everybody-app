import React from 'react'; 
import './WorkoutSelf.css';

function WorkoutSelf(props){
  return (
    <div className="workout-self">
      <h4>{props.name}</h4>
      <p>Duration: {Math.floor(props.duration/60)} minutes</p>
      <p>Description: {props.description}</p>
      <p>Created at: {props.createdAt}</p>
    </div>
  );
}
export default WorkoutSelf