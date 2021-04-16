import React, {useEffect, useState } from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import WorkoutSelf from "./components/WorkoutSelf/WorkoutSelf";
import axios from 'axios';

function ProfilePage(props){
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [likedWorkouts, setLikedWorkouts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUser();
    getLikedWorkouts();
    getUserWorkouts();
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
      const data = response.data.workouts;
      setUserWorkouts(data.map((workout) => <WorkoutSelf key={workout.workout_id} workout={workout} username={props.username}/>))
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const getLikedWorkouts = async () => {
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
        "http://localhost:4567/likedWorkouts",
        toSend,
        config
    )
        .then(response => {
          const data = response.data.workouts
          setLikedWorkouts(data.map((workout1) => <WorkoutSelf key={workout1.workout_id} workout={workout1} username={props.username}/>))
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <div className="profile-page fade-in">
      <ProfileCard id="profile-card" user={user} />
      <div className="workout-wrapper">
      <div className="myWorkouts">
      <h3 id="myWorkouts">My Workouts</h3>
      <div className="profile-workouts">
        {userWorkouts}
      </div>

      </div>
          <div className="line"></div>
      <div className="likedWorkouts">
      <h3 id="likedWorkouts">Liked Workouts</h3>
      <div className="liked-workouts">
        {likedWorkouts}
      </div>
      </div>
      </div>
    </div>
  );
}
export default ProfilePage
