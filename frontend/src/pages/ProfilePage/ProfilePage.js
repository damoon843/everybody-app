import React, {useEffect, useState, useRef} from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Workout from '../HomePage/components/Workout/Workout';
import axios from 'axios';

let workouts = []
let workoutData = []

function ProfilePage(props){
  // const [workouts, setWorkouts] = useState([]);
  // const [data, setData] = useState([]);

  useEffect(() => {
    getUserWorkouts();
  }, []);

  const getUserWorkouts = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const toSend = {
      username: props.username
    };
    await axios.post(
      "http://localhost:4567/userWorkouts",
      toSend,
      config
    )
    .then(response => {
      workoutData = response.data.workouts
      renderWorkouts()
      // setData(response.data.workouts)
      // renderWorkouts();
      // console.log(response.data.workouts)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const renderWorkouts = () => {
    if (workoutData) {
      workouts = workoutData.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>)
    }
    // setWorkouts(data.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>))
  }

  return (
    <div className="profile-page">
      <ProfileCard id="profile-card" username={props.username}/>
      <h3 id="myWorkouts">My Workouts</h3>
      <div className="profile-workouts">
        {workouts}
      </div>
    </div>
  );
}
export default ProfilePage
