import React, { useEffect, useState } from 'react'; 
import Main from './components/Main/Main';
import UserProfile from './components/UserProfile/UserProfile';
import ExerciseModal from './components/ExerciseModal/ExerciseModal'
import WorkoutModal from './components/WorkoutModal/WorkoutModal'
import './HomePage.css';
import { getAllExercises } from '../../api';

function Home(props) {
  const [render, setRender] = useState("");
  const [exercises, setExercises] = useState([]);

  const rerender = (val) => {
    setRender(val);
  }

  const newGetAllExercises = async () => {
    getAllExercises().then(result => {
      const data = Object.values(result)
      const keys = Object.keys(result)
      let exerciseList = [];
      for (let i = 0; i < keys.length; i++) {
        // const item = <ExerciseItem key={keys[i]} data={data[i]}/>
        const opt = <option value={keys[i]}>{data[i][6]}</option>
        exerciseList.push(opt)
      }
      console.log(exerciseList)
      setExercises(exerciseList)
    });
  }

  useEffect(() => {
    newGetAllExercises()
  }, [render])

  return (
    <div className="home">
      <div className="upload">
        <h5>Upload Activities</h5>
        {/* pass in render variable here */}
        <ExerciseModal render={render} rerender={rerender} user={props.user} id="exercise-modal"/>
        {/* pass in results of getAllExercises */}
        <WorkoutModal user={props.user} exercises={exercises} id="workout-modal"/>
      </div>
      <Main user={props.user} />
    </div>
  );
}

export default Home;
