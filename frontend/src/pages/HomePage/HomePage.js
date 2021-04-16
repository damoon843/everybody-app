import React, { useEffect, useState } from 'react'; 
import Recommendations from './components/Recommendations/Recommendations';
import ExerciseModal from './components/ExerciseModal/ExerciseModal'
import WorkoutModal from './components/WorkoutModal/WorkoutModal'
import './HomePage.css';
import axios from 'axios';

function Home(props) {
  const [render, setRender] = useState("");
  const [exercises, setExercises] = useState([]);

  const rerender = (val) => {
    setRender(val);
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
      console.log(response.data)
      const data = Object.values(response.data)
      const keys = Object.keys(response.data)
      let exerciseList = [];
      for (let i = 0; i < keys.length; i++) {
        const opt = <option key={keys[i]} value={keys[i]}>{data[i][6]}</option>
        exerciseList.push(opt)
      }
      setExercises(exerciseList)
      console.log(exerciseList)
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }
  
  useEffect(() => {
    getExercises()
    console.log(props.username)
  }, [render])

  return (
    <div className="home fade-in">
      <div className="upload">
        <h5>Upload Activities</h5>
        <ExerciseModal render={render} rerender={rerender} username={props.username} id="exercise-modal"/>
        <WorkoutModal username={props.username} exercises={exercises} id="workout-modal"/>
      </div>
      <Recommendations username={props.username} />
    </div>
  );
}

export default Home;
