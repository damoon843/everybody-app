import React, {useEffect, useState} from 'react';
import { getRecommendations } from '../../../../api';
import Workout from '../../../../components/Workout/Workout';
import './Main.css';

function Main() {
  const [workouts, setWorkouts] = useState([]);
  const sampleData = [{id: 1, title: "Workout 1", duration: "15 min", user: "Tim Nelson", thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {id: 2, title: "Workout 2", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]}, 
  {id: 3, title: "Workout 3", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];

  useEffect(() => {
    getWorkouts();
    renderWorkouts();
  });

  // makes an api request and sets initial state variable
  const getWorkouts = async () => {
    // const recs = getRecommendations();
    // setWorkouts(recs);
    setWorkouts(sampleData);
  }

  // sets state variable
  const renderWorkouts = () => {
    setWorkouts(sampleData.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>))
  }

  return (
    <div className="home-main">
      <h3 id="recommendations">Recommended for you</h3>
      <div className="home-recs">
        { workouts }
      </div>
    </div>
  );
}

export default Main;