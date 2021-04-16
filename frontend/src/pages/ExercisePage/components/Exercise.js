import React, {useEffect} from "react";
import './Exercise.css'
import ExerciseData from "../../../data/exercises.json";

function Exercise(props){
    //let exercises = [{title: "Mountain Climbers", duration: "15 min", user: "Tim Nelson", description: "This is an short, intensive exercise focused on the core",thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {description: "This is an short, intensive exercise focused on the core",title: "Planks", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]},
       // {description: "This is an short, intensive exercise focused on the core",title: "Crunches", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];

    let exercises = props.exercises
    // let exercises = ExerciseData;
    //console.log(exercises);

    useEffect(() => {
        //getWorkouts();
        renderWorkouts();
    });
    /*
    return this.props.movies.map((movie) => (
        <MovieItem
            key={movie.id}
            movie={movie}
            genres={this.getGenres(movie.genre_ids, this.props.genres)}
        />
    ));
     */

    // TODO: fill this out with a GET request


    const renderWorkouts = () => {

        const anchor = document.getElementById("ex-grid-anchor")
        anchor.innerHTML = '';
        if (exercises) {
            //for (const [key, value] of Object.entries(object))
            /*exercises.forEach((values,keys) =>*/for (const [keys, values] of Object.entries(exercises)) {//this would be done by props.exercise or something
                const container = document.createElement("div")
                const text = document.createElement("div")
                const title = document.createElement("h5")
                const info = document.createElement("p")
                const description = document.createElement("p")
                const followBtn = document.createElement("button")
                // const thumbnail = document.createElement("img")
                // const btn = document.createElement("button")

                title.innerText = values[6]//exercise.title;
                info.innerText = keys + " | " + values[5]
                description.innerText = values[3]
                // thumbnail.src = workout.thumbnail
                // btn.value = "View Exercise"
                followBtn.value = "follow"

                // thumbnail.className = "workout-image"
                info.className = "exercise-info"
                text.className = "exercise-text"
                container.className = "exercise-container"
                // btn.className = "workout-btn"
                // btn.innerHTML = "View Exercise"

                //container.append(thumbnail)
                text.append(title)
                text.append(info)
                text.append(description)
                container.append(text)
                // container.append(btn)
                anchor.append(container)
            };
        }
    }
    return (
        <div className="exercises">
            <h3 id="page-title">Exercises</h3>
            <div id="ex-grid-anchor"></div>
        </div>
    );
}
export default Exercise