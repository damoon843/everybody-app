import React from 'react'; 
import {Card} from 'react-bootstrap'
import './WorkoutSelf.css';
import {Link} from 'react-router-dom';

function WorkoutSelf(props){
  const url = "/workout/" + props.workout.workout_id

  const updateWorkout = () => {
    props.changeWorkout(props.workout)
  }

  return (
    <Card className="workout-self">
      <Card.Img variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
      <Card.Body>
        <Card.Text>
          <div className="workout-title">
            <h4>{props.workout.workout_name}</h4>
          </div>
          <p>Duration: {Math.floor(props.workout.duration/60)} minutes<br></br>Description: {props.workout.description}</p>
          <Link id="start-workout-btn" className="submit-btn" onClick={updateWorkout} to={url}>Start Workout</Link>
          {/* <a href={url}><button id="start-workout-btn" className="submit-btn" onClick={updateWorkout} >Start workout</button></a> */}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
export default WorkoutSelf