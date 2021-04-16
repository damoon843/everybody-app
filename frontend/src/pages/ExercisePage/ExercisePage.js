import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "./components/Sidebar/Sidebar";
import Exercise from "./components/Exercise";
import axios from "axios";

function ExercisePage() {
    const [exercises, setExercises] = useState({});
    const newGetAllExercises = async () => {
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
        console.log(response.data)
        console.log(keys)
        console.log(data)
        setExercises(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  useEffect(() => {
    newGetAllExercises()
  }, []);

  const updateExercises = (e) => {
      console.log("clicked")
      console.log(exercises)

      if (e.target.checked) {
          let filtered = Object.fromEntries(Object.entries(exercises).filter(([k,v]) => v[4].includes(e.target.name)));
          setExercises(filtered)
          console.log(filtered)
      } else {
          console.log('Not checked');
      }


  };

  const resetEx=()=>{
      newGetAllExercises()
  };

  return (
    <div className="exercise-page">
      <div className = "sidebar">
        <Sidebar resetEx = {resetEx} updateExercises = {updateExercises} />
      </div>
      <div className = "exercises">
        <Exercise  exercises={exercises}/>
      </div>
    </div>
  );
}
export default ExercisePage