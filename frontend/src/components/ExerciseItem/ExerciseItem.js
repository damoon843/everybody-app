import React from 'react'
import { Card } from 'react-bootstrap'
import './ExerciseItem.css'

function ExerciseItem(props) {
  return (
    <Card className="exercise-item">
      <Card.Img variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
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