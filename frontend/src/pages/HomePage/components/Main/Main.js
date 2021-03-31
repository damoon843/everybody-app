import React, {useEffect} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRunning, faDumbbell, faShoePrints } from '@fortawesome/free-solid-svg-icons'
import './Main.css';

function Main() {
  let workouts = [{title: "Workout 1", duration: "15 min", user: "Tim Nelson", thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {title: "Workout 2", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]}, 
  {title: "Workout 3", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];

  useEffect(() => {
    getWorkouts();
    renderWorkouts();
  });

  // TODO: fill this out with a GET request
  const getWorkouts = () => {
  }

  const renderWorkouts = () => {
    const anchor = document.getElementById("grid-anchor")
    if (workouts) {
      workouts.forEach(workout => {
        const container = document.createElement("div")
        const text = document.createElement("div")
        const title = document.createElement("h5")
        const info = document.createElement("p")
        const thumbnail = document.createElement("img")
        const btn = document.createElement("button")

        title.innerText = workout.title;
        info.innerText = workout.user + " | " + workout.duration
        thumbnail.src = workout.thumbnail
        btn.value = "Start workout"

        thumbnail.className = "workout-image"
        info.className = "workout-info"
        text.className = "workout-text"
        container.className = "workout-container"
        btn.className = "workout-btn"
        btn.innerHTML = "Start workout"

        container.append(thumbnail)
        text.append(title)
        text.append(info)
        container.append(text)
        container.append(btn)
        anchor.append(container)
      });
    }
  }

  return (
    <div className="home-main">
      <h3 id="recommendations">Recommended for you</h3>
      <div id="grid-anchor"></div>
    </div>
  );
}

export default Main;