import React from 'react'; 
import './Workout.css';
import { followUser } from '../../../../api';

function WorkoutSelf(props){

  return (
    <div className="workout-container">
      <div className="workout-text">
        <h5>{props.workout_it}<span className="workout-info"> ({props.duration})</span></h5>
        <div className="workout-row">
          <p className="workout-info">{props.like_count}</p>
        </div>
      </div>
      <button className="workout-btn">Start workout</button>
    </div>
  );
}
export default WorkoutSelf