import React, {useEffect, useState } from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import WorkoutSelf from "./components/WorkoutSelf/WorkoutSelf";
import axios from 'axios';

function ProfilePage(props){
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserWorkouts();
    getUser();
  }, []);

  const getUser = async () => {
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
      "http://localhost:4567/userInfo",
      toSend,
      config
    )
    .then(response => {
      setUser(response.data)
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }

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
      const data = response.data.workouts
      setWorkouts(data.map((workout) => <WorkoutSelf key={workout.workout_id} workout={workout} username={props.username}/>))
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="profile-page fade-in">
      <ProfileCard id="profile-card" user={user} />
      <h3 id="myWorkouts">My Workouts</h3>
      <div className="profile-workouts">
        {workouts}
      </div>
    </div>
  );
}
export default ProfilePage
