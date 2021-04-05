import React from 'react'; 
import './ExercisePage.css';
import Sidebar from "../../components/Sidebar/Sidebar";
import Exercise from "./components/Exercise";

function ExercisePage(props){

  return (
      <div className="exercise-page">
          <div className = "sidebar">
            <Sidebar></Sidebar>
          </div>
          <div className = "exercises">
              <Exercise/>

          </div>

      </div>
  );
}
export default ExercisePage
