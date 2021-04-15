import React, {useEffect, useState } from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import WorkoutSelf from "./components/WorkoutSelf/WorkoutSelf";
import axios from 'axios';
import Following from "./components/Following/Following";

function ProfilePage(props){
  const [workouts, setWorkouts] = useState([]);
  const [user, setUser] = useState({});
  const [following,setFollowing]=useState([])
  const [followCount, setFollowCount]= useState(0)
  const displayFollowing = []; // set to allFollowing

  useEffect(() => {
    getAllFollowing();
    getUserWorkouts();
    getUser();
  }, [following]);

  const getFollowing = async (username) => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const toSend = {
      username: username
    };
    let res = await axios.post(
        "http://localhost:4567/allFollowing",
        toSend,
        config
  
    )
    return res.data.following
  }

  const getAllFollowing = async () => {
    console.log(props.user)
    getFollowing(props.user).then(result => {
      console.log(result)
      setFollowing(result)
      setFollowCount(result.length)
      console.log(followCount)
    });
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
      <Following user = {props.user} following = {following}></Following>
    </div>
  );
}
export default ProfilePage
