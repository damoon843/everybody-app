import React, { useEffect, useState } from 'react'; 
import './ExercisePage.css';
import Sidebar from "./components/Sidebar/Sidebar";
import AllExercises from "./components/AllExercises/AllExercises";
import ExerciseItem from "../../components/ExerciseItem/ExerciseItem"
import axios from "axios";

function ExercisePage() {
    //const [allEx, setAllEx]=useState({})
    const [allEx, setAllEx]=useState([])
    const [checked, setChecked] = useState([])//names of checked
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
        const data = Object.values(response.data)
        const keys = Object.keys(response.data)
        console.log(response.data)
        console.log(keys)
        console.log(data)

        //setExercises(response.data)

        renderExercises(response.data)
        //setExercises(data)

        //setAllEx(response.data)
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
        const opt = <ExerciseItem key={keys[i]} exercise={data[i]}/>
        result.push(opt)
      }
      setExercises(result)
      setAllEx(result)
  }

  useEffect(() => {
    newGetAllExercises()
  }, []);

  const updateExercises = (e) => {
      console.log("clicked")
      console.log(exercises)

      if (e.target.checked) {
          /*
          if checked, it iterates through exercises and adds only ones that contain the tag name to show
           */

          checked.push(e.target)
          console.log(exercises)
          /*
          let filtered = Object.fromEntries(Object.entries(exercises).filter(v => v[3].includes(e.target.name)));
          setExercises(filtered)
          console.log(filtered)
          console.log(checked)
           */
          //let filtered = exercises.filter(v => console.log(v.props.exercise));

          let filtered = exercises.filter(v => v.props.exercise[3].includes(e.target.name));
          setExercises(filtered)
          console.log(filtered)

      } else {
          /*
          this should only run if it was initially checked and now unchecked
          Unchecking means that more results should appear
          1. get a list of all of the leftover checks
          2. do a for loop where you do the similar thing as in the target checked
          arr = arr.filter(e => e !== 'B')
           */
          let arr = checked.filter(box=> box !== e.target)
          setChecked(arr)
          console.log(arr.length)
          console.log(checked.length)
          if (arr.length >0) {
              console.log("here")
              arr.forEach(id => {
                  console.log(id)
                  /*
                      let filtered = Object.fromEntries(Object.entries(allEx).filter(([k, v]) => v[3].includes(id.name)));
                      setExercises(filtered)

                   */
                  let filtered = exercises.filter(v => v.props.exercise[3].includes(id.name));
                  setExercises(filtered)
                  }
              )
          } else {
              console.log("setting to allEx")
              setExercises(allEx)
          }
          // let filtered = Object.fromEntries(Object.entries(exercises).filter(([k,v]) => v[4].includes(e.target.name)));
          // setExercises(filtered)
          //console.log(filtered)

          console.log('Not checked');
          console.log(arr)
      }


  };

  const resetEx=()=>{
      checked.length = 0
      newGetAllExercises()
  };

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