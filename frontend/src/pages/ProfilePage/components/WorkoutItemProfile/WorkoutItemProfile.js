import React from 'react'; 
import {Card} from 'react-bootstrap'
import './WorkoutItemProfile.css';
import {Link} from 'react-router-dom';

function WorkoutItemProfile(props){
    /*
    This component houses the information for the workout items displayed on a specific user's profile
     */
  const url = "/workout/" + props.workout.workout_id

  const updateWorkout = () => {
    props.changeWorkout(props.workout)
  }

  return (
    <Card className="workout-self">
      <Card.Img alt="workout item thumbnail" variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
      <Card.Body>
          <div className="workout-title">
            <h4>{props.workout.workout_name}</h4>
          </div>
          <p>Duration: {Math.floor(props.workout.duration/60)} minutes<br></br>Description: {props.workout.description}</p>
          <Link className="link-btn" onClick={updateWorkout} to={url}><button className="start-workout-btn submit-btn">Start Workout</button></Link>
      </Card.Body>
    </Card>
  );
}
export default WorkoutItemProfile