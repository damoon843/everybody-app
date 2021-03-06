import React, { useEffect, useState, useRef } from 'react'; 
import Recommendations from './components/Recommendations/Recommendations';
import ExerciseModal from './components/ExerciseModal/ExerciseModal';
import WorkoutModal from './components/WorkoutModal/WorkoutModal';
import './HomePage.css';
import axios from 'axios';

/**
 * Homepage is the default page for a user that logs in. It displays a collection of workouts specifically curated for the user using the information sent via the getExercises post request. There are also buttons to upload exercises and workouts via a prompted modal.
 * @param {*} props the username of the current user
 * @returns the home page
 */
function Home(props) {
  // the list of exercises to display for selection in the workout modal
  const exercises = useRef([]);
  // the current user. used to preserve state as user switches pages
  const username = useRef("");
  // render marker variable used to update the list of exercises in the workout modal when the user posts a new exercise
  const [render, setRender] = useState("");

  /**
   * Changes the value of the render marker variable.
   * @param {*} val the value to change to
   */
  const rerender = (val) => {
    setRender(val);
  }

  /**
   * Changes the value of the username ref
   */
  const saveUsername = () => {
    username.current = props.username.current
  }

  /**
   * Gets all the exercises in the database. Renders each as an option to be selected, and then passes into Workout modal for selection
   */
  const getExercises = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    await axios.post(
      "http://localhost:4567/publicExercises",
      config,
    )
    .then(response => {
      const data = Object.values(response.data)
      const keys = Object.keys(response.data)
      let exerciseList = [];
      for (let i = 0; i < keys.length; i++) {
        const opt = <option key={keys[i]} value={keys[i]}>{data[i][0]}</option>
        exerciseList.push(opt)
      }
      exercises.current = exerciseList
    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  useEffect(() => {
    getExercises()
    saveUsername()
  }, [render, exercises])

  return (
    <div className="home fade-in">
      <div className="upload">
        <h3>Upload Activities</h3>
        <ExerciseModal render={render} rerender={rerender} username={props.username.current} id="exercise-modal"/>
        <WorkoutModal username={props.username.current} exercises={exercises} id="workout-modal"/>
      </div>
      <Recommendations changeWorkout={props.changeWorkout} username={props.username.current} />
    </div>
  );
}

export default Home;
