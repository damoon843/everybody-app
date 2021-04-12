import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Exercise from "./components/Exercise";
import { getAllExercises } from "../../api";

function ExercisePage() {
  const [exercises, setExercises] = useState([]);

  useEffect(() => {
    setExercises(getAllExercises());
  }, []);
  const updateExercises = (e) => {
      console.log("clicked")
      console.log(getAllExercises())

      if (e.target.checked) {
          //const currState = [...this.state.movies];
          //console.log(exercises)
          //const newState = exercises.filter(exercise => exercise.exercise_target_area.includes(parseInt(e.target.name)));
          //setExercises(newState)
      } else {
          console.log('Not checked');
      }


  };

  return (
    <div className="exercise-page">
      <div className = "sidebar">
        <Sidebar updateExercises = {updateExercises} />
      </div>
      <div className = "exercises">
        <Exercise exercises={exercises}/>
      </div>
    </div>
  );
}
export default ExercisePage
