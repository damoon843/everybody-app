import React, {useEffect, useState, useRef} from "react";
import './Exercise.css'
import ExerciseData from "../../../data/exercises.json";
import ExerciseItem from '../../../components/ExerciseItem/ExerciseItem'

function Exercise(props){
    let exercises = props.exercises
    const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        console.log(exercises)
        renderWorkouts();
    }, []);

    const renderWorkouts = () => {

        // const anchor = document.getElementById("ex-grid-anchor")
        // anchor.innerHTML = '';
        let result = [];
        if (exercises) {
            for (const [keys, values] of Object.entries(exercises)) {
                // const container = document.createElement("div")
                // const text = document.createElement("div")
                // const title = document.createElement("h5")
                // const info = document.createElement("p")
                // const description = document.createElement("p")
                // const followBtn = document.createElement("button")
                // const tags = document.createElement("p")
                // const thumbnail = document.createElement("img")
                // // const btn = document.createElement("button")

                // title.innerText = values[6] + " ("+ values[1]+' min)'//exercise.title;
                // info.innerText =  "User: "+ values[5]
                // description.innerText = values[3]
                // tags.innerText = "tags: "+ values[4]
                // thumbnail.src = "https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg"
                // // btn.value = "View Exercise"
                // followBtn.value = "follow"

                // thumbnail.className = "workout-image"
                // info.className = "exercise-info"
                // text.className = "exercise-text"
                // container.className = "exercise-container"
                // // btn.className = "workout-btn"
                // // btn.innerHTML = "View Exercise"

                // container.append(thumbnail)
                // text.append(title)
                // text.append(description)
                // text.append(info)
                // text.append(tags)

                // container.append(text)
                // // container.append(btn)
                // anchor.append(container)
                // const elt = <ExerciseItem exercise={values} />
                console.log(values)
                // result.push(elt);
            };
            setExerciseList(result)
        }
    }
    return (
        <div className="exercises">
            <h3 id="page-title">Exercises</h3>
            <div id="ex-grid-anchor">
                { exerciseList }
            </div>
        </div>
    );
}
export default Exercise