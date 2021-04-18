import React from 'react'
import { Card } from 'react-bootstrap'
import './ExerciseItem.css'

/**
 * Component representing a single exercise.
 * @param {*} props an array representing a single exercise object
 * @returns a grid item for an exercise
 */
function ExerciseItem(props) {
  return (
    <Card className="exercise-item">
      <Card.Img variant="top" src="https://upload.wikimedia.org/wikipedia/commons/6/60/Working_Out_At_The_Reily_Center_%283726377407%29.jpg" alt="exercise item thumbnail"/>
      <Card.Body>
        <Card.Title>
          {props.exercise[0]}
        </Card.Title>
        <p>Duration: {Math.floor(props.exercise[2]/60)} minutes<br></br>Description: {props.exercise[4]}</p>
        <p className="tags">Tags: {props.exercise[3].join(', ')}<br></br>Posted by {props.exercise[5]}</p>
      </Card.Body>
    </Card>
  );
}

export default ExerciseItem