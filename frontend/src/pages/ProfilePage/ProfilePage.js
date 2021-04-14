import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import Workout from '../HomePage/components/Workout/Workout';
import axios from 'axios';

function ProfilePage(props){
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getUserWorkouts();
  }, [workouts]);

  const getUserWorkouts = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const toSend = {
      username: props.user
    };
    await axios.post(
      "http://localhost:4567/userWorkouts",
      toSend,
      config
    )
    .then(response => {
      const data = response.data
      setWorkouts(data.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>))
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="profile-page">
      <ProfileCard id="profile-card" user={props.user}/>
      <div className="profile-workouts-container">
        <h3 id="myWorkouts">My Workouts</h3>
        <div className="profile-workouts">
          {workouts}
        </div>
      </div>
    </div>
  );
}
export default ProfilePage
