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

  return (
    <div className="exercise-page">
      <div className = "sidebar">
        <Sidebar />
      </div>
      <div className = "exercises">
        <Exercise exercises={exercises}/>
      </div>
    </div>
  );
}
export default ExercisePage
