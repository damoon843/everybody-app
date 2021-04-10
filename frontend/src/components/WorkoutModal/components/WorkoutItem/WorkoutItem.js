import React from 'react';
import './WorkoutItem.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons'

// pass in an exercise object with {title: "exercise 1", etc.}
function WorkoutItem(props){
  return (
    <div className="workout-item row">
      <div className="workout-item-text col">
        <h5>{props.title}</h5>
        <p>{props.duration}</p>
      </div>
      <FontAwesomeIcon class="icon-plus" icon={faPlusCircle} />
    </div>
  );
}
export default WorkoutItem
