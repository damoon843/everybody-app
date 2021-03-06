import React from 'react'; 
import {Card} from 'react-bootstrap'
import './WorkoutItemProfile.css';
import {Link} from 'react-router-dom';

/**
 * Houses the information for the workout items displayed on a specific user's profile.
 * 
 * @param {*} props the workout to display on the profile page.
 * @returns a component representing a single workout.
 */
function WorkoutItemProfile(props){
  // the url routing to the workout to display individually on click
  const url = "/workout/" + props.workout.workout_id

  /**
   * Updates the value of the workout to display individually
   */
  const updateWorkout = () => {
    props.changeWorkout(props.workout)
  }

  return (
    <Card className="workout-self">
      <Card.Img alt="workout item thumbnail" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sp0U82qOF8DUvVZt0pgIp03jhi7tQxdCpg&usqp=CAU" />
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