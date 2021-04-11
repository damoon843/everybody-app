import React from 'react'; 
import './Workout.css';

function Workout(props){
  const url = "http://localhost:3000/workout/" + props.id
  return(
    <div className="workout-container">
      <img className="workout-image" src={props.thumbnail}/>
      <div className="workout-text">
        <h5>{props.title}</h5>
        <p className="workout-info">{props.user} | {props.duration}</p>
      </div>
      <a href={url}><button className="workout-btn">Start workout</button></a>
    </div>
  );
}
export default Workout