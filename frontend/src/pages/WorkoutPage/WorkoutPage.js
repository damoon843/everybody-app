import React, { useState, useEffect, useRef } from 'react'; 
import './WorkoutPage.css';
import axios from 'axios';
import ExerciseItem from './components/ExerciseItem/ExerciseItem'

// const workout = {workout_name: "Sample Workout Name", workout_id: 1 , posting_user: "johnnyappleseed", created_at: "2021-04-15", description: "This is the description of the sample workout.", duration: 180, media_link: "google.com", like_count: 5, following: false}

function WorkoutPage(props) {
  const [following, setFollowing] = useState(props.workout.current.following)
  const exercises = useRef([]);

  const getWorkoutExercises = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    let toSend = {
      username: props.username.current,
      workoutName: props.workout.current.workout_name
    }
    console.log(toSend)
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
        // const opt = <option key={keys[i]} value={keys[i]}>{data[i][6]}</option>
        exerciseList.push(opt)
      }
      console.log(exerciseList)
      exercises.current = exerciseList
      console.log(exercises.current)
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }

  const followUser = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      username: props.username.current,
      following: props.workout.current.posting_user
    }
    await axios.post(
        "http://localhost:4567/follow",
        toSend,
        config
    )
    .then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const unfollowUser = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      username: props.username.current,
      following: props.workout.current.posting_user
    }
    await axios.post(
        "http://localhost:4567/unfollow",
        toSend,
        config
    )
    .then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const toggleFollowing = () => {
    if (following) {
      unfollowUser().then(response => {
        setFollowing(false)
      })
    } else {
      followUser().then(response => {
        setFollowing(true)
      })
    }
  }

  useEffect(() => {
    getWorkoutExercises()
    console.log("hi")
    console.log(props.workout)
  }, [following, exercises])

  return (
    <div className="workout-page fade-in">
      <div className="workout-page-container">
        <div className="workout-info">
          <h1 id="workout-title">{props.workout.current.workout_name}</h1>
          <h2>{props.workout.current.description}</h2>
          <div className="workout-detail-user">
            <h4 id="workout-detail-poster">{props.workout.current.posting_user}</h4>
              {props.workout.current.following 
            ? <button className="detail-following-btn" onClick={toggleFollowing}>Following</button> : <button className="detail-follow-btn" onClick={toggleFollowing}>Follow</button>}
          </div>
          <div className="additional-details">
            <p>Estimated duration: {Math.floor(props.workout.current.duration/60)} minutes <br></br> Created: {props.workout.current.created_at}</p>
          </div>
        </div>
        <hr></hr>
        <h2 id="workout-subheading">Exercises</h2>
        <div className="workout-page-exercises">
        { exercises.current }
        </div>
        {/* { exercises } */}
        {/* <ExerciseItem/> */}
      </div>
    </div>
  );
}

export default WorkoutPage
