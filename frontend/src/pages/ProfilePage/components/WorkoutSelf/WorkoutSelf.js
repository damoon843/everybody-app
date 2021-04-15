import React from 'react'; 
import {Card} from 'react-bootstrap'
import './WorkoutSelf.css';

function WorkoutSelf(props){
  const url = "/workout/" + props.workout.workout_id
  return (
    <Card className="workout-self">
      <Card.Img variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
      <Card.Body>
        <Card.Text>
          <div className="workout-title">
            <h4>{props.workout.workout_name}</h4>
          </div>
          <p>Duration: {Math.floor(props.workout.duration/60)} minutes<br></br>Description: {props.workout.description}</p>
          <a href={url}><button id="start-workout-btn" className="submit-btn" >Start workout</button></a>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default WorkoutSelf