import React, { useEffect, useState, useRef } from 'react'; 
import Recommendations from './components/Recommendations/Recommendations';
import ExerciseModal from './components/ExerciseModal/ExerciseModal'
import WorkoutModal from './components/WorkoutModal/WorkoutModal'
import './HomePage.css';
import axios from 'axios';

function Home(props) {
  const [render, setRender] = useState("");
  const [exercises, setExercises] = useState([]);
  let username = useRef("");

  const rerender = (val) => {
    setRender(val);
  }

  const saveUsername = () => {
    username.current = props.username.current
  }

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
        const opt = <option key={keys[i]} value={keys[i]}>{data[i][6]}</option>
        exerciseList.push(opt)
      }
      setExercises(exerciseList)
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }
  
  useEffect(() => {
    getExercises()
    saveUsername()
    console.log(username.current)
  }, [render])

  return (
    <div className="home fade-in">
      <div className="upload">
        <h5>Upload Activities</h5>
        <ExerciseModal render={render} rerender={rerender} username={username.current} id="exercise-modal"/>
        <WorkoutModal username={username.current} exercises={exercises} id="workout-modal"/>
      </div>
      <Recommendations changeWorkout={props.changeWorkout} username={username.current} />
    </div>
  );
}

export default Home;
