import React from 'react'; 
import './Workout.css';

function Workout(props){
  return(
    <div className="workout-container">
      <img className="workout-image" src={props.thumbnail}/>
      <div className="workout-text">
        <h5>{props.title}</h5>
        <p className="workout-info">{props.user} | {props.duration}</p>
      </div>
      <button className="workout-btn">Start workout</button>
    </div>
  );
}
export default Workout