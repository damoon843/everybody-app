import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Exercise from "./components/Exercise";
import { getAllExercises } from "../../api";

function ExercisePage() {
  const [exercises, setExercises] = useState({});

    const exercisesTemp = {
        //map {id: [object]} where [object] = [exerciseName, mediaLink, duration, tags, description, time]
        "id1" : ['exerciseName', 'mediaLink', 'duration', ["abs", "chest"], "description", "time"],
        "id2" : ['exerciseName', 'mediaLink', 'duration', ["chest"], "description", "time"],
        "id3" : ['exerciseName', 'mediaLink', 'duration', ["arms"], "description", "time"]

    }


  useEffect(() => {
      //console.log()
    setExercises(exercisesTemp);
      /*
      const ex = getAllExercises()
      ex.then(function(result) {
          console.log(result) // "Some User token"
      })

       */
  }, []);


  const updateExercises = (e) => {
      console.log("clicked")
      console.log(exercises)

      if (e.target.checked) {
          //const currState = [...this.state.movies];
          //console.log(exercises)
          let filtered = Object.fromEntries(Object.entries(exercises).filter(([k,v]) => v[3].includes(e.target.name)));


          setExercises(filtered)
          console.log(filtered)
          //tags = exercises[3]
          //const newState = exercises.filter(exercise => exercise.exercise_target_area.includes(parseInt(e.target.name)));
          //setExercises(newState)
      } else {
          console.log('Not checked');
      }


  };

  const resetEx=()=>{
      console.log("resetting")
      setExercises(exercisesTemp);

  };

  return (
    <div className="exercise-page">
      <div className = "sidebar">
        <Sidebar updateExercises = {updateExercises} />
      </div>
      <div className = "exercises">
        <Exercise resetEx = {resetEx} exercises={exercises}/>
      </div>
    </div>
  );
}
export default ExercisePage
