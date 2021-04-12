import React, {useEffect, useState} from 'react';
import './Sidebar.css';
import {Button} from "react-bootstrap";

function Sidebar(props){
  /*
  1. may want to have all of the exercises intially rendered/displayed as a json object
  this way we can organize/display the keys
   */

    const [abs, setAbs] = useState(false);
    const [chest, setChest] = useState(false);
    const [legs, setLegs] = useState(false);

    const checkClick = (e)=> {
        var {name, checked} = e.target

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

        <h3>Ratings</h3>
      <ul className = "ratings">
          <li><input type = "checkbox" name = "1 Star" id = "1" onChange={checkClick}/> <label for="1"> 1 Star</label></li>
          <li><input type = "checkbox" name = "2 Star" id = "2" onChange={checkClick}/> <label for="2"> 2 Star</label></li>
          <li><input type = "checkbox" name = "3 Star" id = "3" onChange={checkClick}/> <label for="3"> 3 Star</label></li>
          <li><input type = "checkbox" name = "4 Star" id="4" onChange={checkClick}/> <label for="4"> 4 Star</label></li>
          <li><input type = "checkbox" name = "5 Star" id = "5" onChange={checkClick}/> <label for="5"> 5 Star</label></li>

      </ul>
      <hr/>

          <Button variant ="outline-dark">Apply Filters</Button>
      </div>
  );
}
export default Sidebar