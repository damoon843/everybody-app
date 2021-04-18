import React, {useEffect} from "react";
import './AllExercises.css'

function AllExercises(props){
    let exercises = props.exercises
    // const [exerciseList, setExerciseList] = useState([]);

    useEffect(() => {
        console.log(props.exercises)
        console.log(exercises)
        // let list = renderExercises()
        // setExerciseList(list)
    }, []);

    // const renderExercises = () => {
    //     const data = Object.values(exercises)
    //     const keys = Object.keys(exercises)
    //     let result = [];
    //     for (let i = 0; i < keys.length; i++) {
    //       const opt = <ExerciseItem key={keys[i]} exercise={data[i]}/>
    //       result.push(opt)
    //     }
    //     setExerciseList(result)
    // }

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