import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "./components/Sidebar/Sidebar";
import AllExercises from "./components/AllExercises/AllExercises";
import ExerciseItem from "../../components/ExerciseItem/ExerciseItem"
import axios from "axios";

function ExercisePage() {
    /*
    ExercisePage displays the filter and a grid of exercises that is retrieved from the post request made by
    the newGetAllExercises method. State hooks were used to manage the resulting exercises; allEx maintains a copy
    of the full exercise list, exercises maintains the exercises to be displayed, and checked keeps track of categories
    that were checked by the filter panel.
     */
    const [allEx, setAllEx]=useState([])
    const [checked, setChecked] = useState([])
    const [exercises, setExercises] = useState([])

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
        renderExercises(response.data)
      })
      .catch(function (error) {
        console.log(error);
      });
    }

  const renderExercises = (exerciseData) => {
      const data = Object.values(exerciseData)
      const keys = Object.keys(exerciseData)
      let result = [];
      for (let i = 0; i < keys.length; i++) {
        const opt = <ExerciseItem key={keys[i]} exercise={data[i]}/> //renders the exercises
        result.push(opt)
      }
      setExercises(result) //sets the initial exercises
      setAllEx(result) //sets the copy (won't be filtered)
  }

  useEffect(() => {
    newGetAllExercises()
  }, []);


//function gets passed into the sidebar as a prop, and gets called whenever a button is clicked
  const updateExercises = (e) => {
      if (e.target.checked) { //CLICKED

          //if checked, it iterates through exercises and adds only ones that contain the tag name to show

          checked.push(e.target)
          let filtered = exercises.filter(v => v.props.exercise[3].includes(e.target.name));
          setExercises(filtered)
      } else { //UNCLICKED

          //this should only run if it was initially checked and now unchecked

          let arr = checked.filter(box=> box !== e.target)
          setChecked(arr)
          if (arr.length >0) { //retrieves all of the still checked categories and sets the exercises to that
              arr.forEach(id => {
                  let filtered = exercises.filter(v => v.props.exercise[3].includes(id.name));
                  setExercises(filtered)
                  }
              )
          } else {
              setExercises(allEx)
          }
      }


  };

  //function is passed into the sidebar, triggered onclick
  const resetEx=()=>{
      checked.length = 0
      newGetAllExercises()
  };

  //displays a grid of exercises and filter bar
  return (
    <div className="exercise-page fade-in">
      <div className = "sidebar">
        <Sidebar  resetEx = {resetEx} updateExercises = {updateExercises} />
      </div>
      <div className = "exercises">
        <AllExercises  exercises={exercises}/>
      </div>
    </div>
  );
}
export default ExercisePage