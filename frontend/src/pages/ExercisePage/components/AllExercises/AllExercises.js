import React, {useEffect} from "react";
import './AllExercises.css'

function AllExercises(props){
    let exercises = props.exercises

    useEffect(() => {
    }, []);

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