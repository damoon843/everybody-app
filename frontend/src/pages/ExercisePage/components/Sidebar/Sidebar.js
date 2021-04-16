import React from 'react';
import './Sidebar.css';
import {Button} from "react-bootstrap";

function Sidebar(props){


    const checkClick = (e)=> {
        props.resetEx()
        // var {name, checked} = e.target

        /*

         */

    }


  return (
      <div className = "filters">
        <h1>Filters</h1>
        <hr/>
          <h3>Type</h3>
      <ul className = "type-tag">
          <li><input type = "checkbox" id="cardio" name = "cardio" onChange={props.updateExercises}/>
          <label for = "cardio"> Cardio</label>
          </li>
          <li>
          <input type = "checkbox" id="bodyweight" name = "bodyweight" onChange={props.updateExercises}/>
          <label for="bodyweight"> Bodyweight</label>
          </li>
      </ul>
          <hr/>
          <h3>BodyPart</h3>
      <ul className = "body-tag">
          <li>
          <input type = "checkbox" name = "abs" id = "abs" onChange={props.updateExercises}/> <label for="abs"> Abs</label>
          </li>
          <li>
          <input type = "checkbox" name = "chest" id = "chest" onChange={props.updateExercises}/> <label for="abs"> Chest</label>
          </li>
          <li>
          <input type = "checkbox" name = "legs" id = "legs" onChange={props.updateExercises}/> <label for="abs"> Legs</label>
          </li>
          <li>
          <input type = "checkbox" name = "arms" id = "arms" onChange={props.updateExercises}/> <label for="abs"> Arms</label>
          </li>
      </ul>
      <hr/>

      <Button onClick={props.resetEx} variant ="outline-dark">Reset</Button>
      </div>
  );
}
export default Sidebar