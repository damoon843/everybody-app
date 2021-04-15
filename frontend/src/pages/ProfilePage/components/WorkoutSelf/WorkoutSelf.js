import React from 'react'; 
import './Workout.css';
import { followUser } from '../../../../api';

function WorkoutSelf(props){
  const url = "/workout/" + props.id

  const follow = () => {
    const toSend = {
      // TODO: remove hard coding
      user: "ntim",
      following: "aguo"
    };
    console.log(toSend)
    followUser(toSend).then(result => {
      console.log("user followed!")
    })
  }

  return (
    <div className="workout-container">
      <div className="workout-text">
        <h5>{props.workout_it}<span className="workout-info"> ({props.duration})</span></h5>
        <div className="workout-row">
          <p className="workout-info">{props.like_count}</p>
        </div>
      </div>
      <a href={url}><button className="workout-btn">Start workout</button></a>
    </div>
  );
}
export default WorkoutSelf