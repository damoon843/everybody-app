import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import { getWorkouts } from "../../api";
import Workout from '../HomePage/components/Workout/Workout';

function ProfilePage(props){
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    getUserWorkouts();
    renderWorkouts();
  }, []);

  // sets state variable
  const renderWorkouts = () => {
    setWorkouts(workouts.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>))
  }

  // makes an api request and sets initial state variable
  const getUserWorkouts = async () => {
    getWorkouts(props.user).then(result => {
      setWorkouts(result);
    });
  }

  return (
    <div className="profile-page">
        <div id = "prof-card">
            <ProfileCard/>
        </div>
        <p>{props.user}</p>
        <div className="profile-workouts">
        {workouts}
        </div>
    </div>
  );
}
export default ProfilePage
