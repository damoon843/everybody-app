import React from 'react';
import './WorkoutModal.css';

function ExerciseItem(props){
  console.log(props)
  return (
    <div className="exercise-item">
      <h3>{props.data[6]}</h3>
    </div>
  );
}
export default ExerciseItem
