import React, { useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import './ExerciseItem.css'

// const exercise = ['2020-04-15', 3, "https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg", "For this exercise, run as fast as you can for a short interval. This is great for interval workouts or high-intensity training.", ["arms", "legs", "cardio"], "janedoe", "Sprints"]

function ExerciseItem(props) {
  useEffect(()=> {
    console.log(props.exercise)
  }, [])

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