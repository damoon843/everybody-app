import React, {useEffect, useRef, useState} from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import WorkoutSelf from "./components/WorkoutSelf/WorkoutSelf";
import axios from 'axios';

function ProfilePage(props){
  const [render, setRender] = useState("");
  const [userData, setUserData] = useState({})
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [likedWorkouts, setLikedWorkouts] = useState([]);

  useEffect(() => {
    getUser();
    getLikedWorkouts();
    getUserWorkouts();
    console.log(props.userData.current)
  }, []);

  const rerender = (val) => {
    setRender(val);
  }

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
      props.changeUserData(response.data)
      setUserData(props.userData.current)
      console.log(props.userData)
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
      props.changeMyWorkouts(data.map((workout) => <WorkoutSelf changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>))
      setUserWorkouts(props.myWorkouts.current)
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
          props.changeLikedWorkouts(data.map((workout) => <WorkoutSelf changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>))
          setLikedWorkouts(props.likedWorkouts.current)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  return (
    <div className="profile-page fade-in">
      <ProfileCard id="profile-card" userData={userData} rerender={rerender} />
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
