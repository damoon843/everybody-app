import React from 'react';
import './WorkoutItem.css';

// pass in an exercise object with {title: "exercise 1", etc.}
function WorkoutItem(props){
  return (
    <div className="workout-item">
      <h5>{props.title}</h5>
      <p id="item-exercise-duration">{props.duration}</p>
    </div>
  );
}
export default WorkoutItem
