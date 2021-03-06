import React, { useState, useEffect } from 'react'; 
import './WorkoutPage.css';
import axios from 'axios';
import ExerciseItem from '../../components/ExerciseItem/ExerciseItem'
import {followUser, unfollowUser} from '../../api.js';

/**
 * The workout page is displayed when a user presses 'start workout'. Shows expanded information and all of the comprising exercises.
 * 
 * @param {*} props takes in the current username, the workout to render, and the function changing the value of the current workout on the page.
 * @returns a page representing an individual workout.
 */
function WorkoutPage(props) {
  // a state button representing whether or not the user is following the workout poster
  const [following, setFollowing] = useState(props.workout.current.following)
  // the list of exercises for the given workout
  const [exercises, setExercises] = useState([]);

  //post request retrieves exercises for that specific workout by sending username and workout name; exercises are displayed via exercise items
  const getWorkoutExercises = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    let toSend = {
      username: props.workout.current.posting_user,
      workoutName: props.workout.current.workout_name
    }
    await axios.post(
      "http://localhost:4567/getWorkoutExercises",
      toSend,
      config,
    )
    .then(response => {
      const data = Object.values(response.data)
      const keys = Object.keys(response.data)
      let exerciseList = [];
      for (let i = 0; i < keys.length; i++) {
        const opt = <ExerciseItem key={keys[i]} exercise={data[i]}/>
        exerciseList.push(opt)
      }
      setExercises(exerciseList)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // button allows for following of a specific user, the author of the workout
  const toggleFollowing = () => {
    const toSend = {
      username: props.username.current,
      following: props.workout.current.posting_user
    }
    if (following) {
      unfollowUser(toSend).then(response => {
        setFollowing(false)
      })
    } else {
      followUser(toSend).then(response => {
        setFollowing(true)
      })
    }
  }

  useEffect(() => {
    getWorkoutExercises()
  }, [following])

  return (
    <div className="workout-page fade-in">
      <div className="workout-page-container">
        <div className="workout-info">
          <h1 id="workout-title">{props.workout.current.workout_name}</h1>
          <h2>{props.workout.current.description}</h2>
          <div className="workout-detail-user">
            <h4 id="workout-detail-poster">{props.workout.current.posting_user}</h4>
              {following 
            ? <button className="detail-following-btn" onClick={toggleFollowing}>Following</button> : <button className="detail-follow-btn" onClick={toggleFollowing}>Follow</button>}
          </div>
          <div className="additional-details">
            <p>Estimated duration: {Math.floor(props.workout.current.duration/60)} minutes <br></br> Created: {props.workout.current.created_at}</p>
          </div>
        </div>
        <hr></hr>
        <h2 id="workout-subheading">Exercises</h2>
        <div className="workout-page-exercises">
          {exercises}
        </div>
      </div>
    </div>
  );
}

export default WorkoutPage
