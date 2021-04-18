import React from "react";
import './AllExercises.css'

/**
 * Wrapper component for all the exercises updated in the parent component.
 * @param {*} props the list of exercises to render on the exercises page.
 * @returns the currently selected exercises.
 */
function AllExercises(props){
    let exercises = props.exercises
    return (
        <div className="exercises">
            <h3 id="page-title">Exercises</h3>
            <div id="ex-grid-anchor">
                { exercises }
            </div>
        </div>
    );
}
export default AllExercises