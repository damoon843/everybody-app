import React from 'react';
import './Sidebar.css';
import {Button} from "react-bootstrap";

function Sidebar(props){
    const checkClick = (e)=> {
        let x = document.getElementsByTagName("input");
        for(let i=0; i<=x.length-1; i++) {
            x[i].checked = false;
        }
    }
  return (
      <div className = "filters">
        <h3 id="filter-header">Filter Exercises</h3>
        <h4 className="filter-title">Type</h4>
        <div className="filter-div">
            <label for = "cardio"><input className="checkbox-input" type = "checkbox" id="cardio" name = "cardio" onChange={props.updateExercises}/>Cardio</label>
            <label for="bodyweight"><input className="checkbox-input" type = "checkbox" id="bodyweight" name = "bodyweight" onChange={props.updateExercises}/>Bodyweight</label>
        </div>
        <h4 className="filter-title">Body Part</h4>
        <div className="filter-div">
            <div className="filter-col">
                <label for="abs"><input className="checkbox-input" type = "checkbox" name = "abs" id = "abs" onChange={props.updateExercises}/>Abs</label>
                <label for="chest"><input className="checkbox-input" type = "checkbox" name = "chest" id = "chest" onChange={props.updateExercises}/>Chest</label>
            </div>
            <div className="filter-col">
                <label for="legs"><input className="checkbox-input" type = "checkbox" name = "legs" id = "legs" onChange={props.updateExercises}/>Legs</label>
                <label for="arms"><input className="checkbox-input" type = "checkbox" name = "arms" id = "arms" onChange={props.updateExercises}/>Arms</label>
            </div>
        </div>
      <Button id="reset-btn" onClick={()=>{props.resetEx();checkClick()}} variant ="outline-dark">Reset</Button>
      </div>
  );
}
export default Sidebar