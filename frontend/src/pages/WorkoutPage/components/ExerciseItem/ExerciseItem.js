import React from 'react'
import { Card, Button } from 'react-bootstrap'
import './ExerciseItem.css'

const exercise = ['2020-04-15', 3, "https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg", "For this exercise, run as fast as you can for a short interval. This is great for interval workouts or high-intensity training.", ["arms", "legs", "cardio"], "janedoe", "Sprints"]

function ExerciseItem(props) {
  const getTags = (tags) => {
    let tagStr = ""
    tags.forEach(tag => {
      tagStr += tag
    })
  }

  return (
    <Card className="exercise-item">
      <Card.Img variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
      <Card.Body>
        <Card.Title>
          {exercise[6]} ({exercise[1]} min)
        </Card.Title>
        <Card.Text>
          {exercise[3]}<br></br><br></br>Tags: {exercise[4].join(', ')}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ExerciseItem