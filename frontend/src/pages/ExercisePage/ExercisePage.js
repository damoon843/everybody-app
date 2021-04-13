import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Exercise from "./components/Exercise";
import { getAllExercises } from "../../api";
import axios from "axios";
import ExerciseItem from "../HomePage/components/WorkoutModal/ExerciseItem";

function ExercisePage() {
  const [exercises, setExercises] = useState({});

    const exercisesTemp = {
        //map {id: [object]} where [object] = [exerciseName, mediaLink, duration, tags, description, time]
        "id1" : ['exerciseName', 'mediaLink', 'duration', ["abs", "chest"], "description", "time"],
        "id2" : ['exerciseName', 'mediaLink', 'duration', ["chest"], "description", "time"],
        "id3" : ['exerciseName', 'mediaLink', 'duration', ["arms"], "description", "time"]

    }


    const newGetAllExercises = async () => {
        getAllExercises().then(result => {

            const data = Object.values(result)
            const keys = Object.keys(result)
            /*
            let exerciseList = [];
            for (let i = 0; i < keys.length; i++) {
                // const item = <ExerciseItem key={keys[i]} data={data[i]}/>
                const opt = <option value={keys[i]}>{data[i][6]}</option>
                exerciseList.push(opt)
            }
            console.log(exerciseList)

             */
            console.log(result)
            console.log(keys)
            console.log(data)
            setExercises(result)//(exerciseList)
        });
    }




  useEffect(() => {
      //console.log()
      newGetAllExercises()
    //setExercises(exercisesTemp);
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
          let filtered = Object.fromEntries(Object.entries(exercises).filter(([k,v]) => v[4].includes(e.target.name)));


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
      newGetAllExercises()
      /*
      console.log("resetting")
      setExercises(exercisesTemp);

       */

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
