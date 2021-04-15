import React, {useEffect, useState} from 'react';
// import { getRecommendations } from '../../../../api';
import Workout from '../WorkoutItem/WorkoutItem';
import './Recommendations.css';
import axios from 'axios';

function Recommendations(props) {
  const [workouts, setWorkouts] = useState([]);
  // const [data, setData] = useState([]);
  // const sampleData = [{id: 1, title: "Workout 1", duration: "15 min", user: "chrissy", thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {id: 2, title: "Workout 2", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]}, 
  // {id: 3, title: "Workout 3", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];

  const getRecommendations = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    console.log(props.username.current)
    const toSend = {
      username: props.username.current
    };
    await axios.post(
      "http://localhost:4567/getRecommendations",
      toSend,
      config,
    )
    .then(response => {
      const data = response.data.workouts
      console.log(data)
      setWorkouts(data.map((workout) => <Workout key={workout.id} id={workout.workout_id} name={workout.workout_name} createdAt={workout.created_at} description={workout.description} duration={workout.duration} postingUser={workout.posting_user} likeCount={workout.like_count} mediaLink={workout.media_link} username={props.username} following={workout.following}/>))
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }

  useEffect(() => {
    // getRecommendations();
  }, []);

  // makes an api request and sets initial state variable
  // const getWorkouts = async () => {
  //   getRecommendations(props.username).then(result => {
  //     setData(result)
  //   });
  // }

  // sets state variable
  // const renderWorkouts = () => {
  //   setWorkouts(data.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} postUser={exercise.user} thumbnail={exercise.thumbnail} user={props.user}/>))
  // }

  return (
    <div className="home-main">
      <h3 id="recommendations">Recommended for you</h3>
      <div className="home-recs">
        { workouts }
      </div>
    </div>
  );
}

export default Recommendations;