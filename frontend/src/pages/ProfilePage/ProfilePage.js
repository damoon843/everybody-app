import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import ExpandedUserProfile from "./components/ExpandedUserProfile/ExpandedUserProfile";

import Main from "../HomePage/components/Main/Main";
import {Button} from "react-bootstrap";
import {getAllExercises, getFollowing, getWorkouts} from "../../api";
import { getUser } from "../../api";
import Workout from '../../components/Workout/Workout';
import Profile from './components/Profile/Profile';
import Following from "./components/Following/Following";

function ProfilePage(props){
  const [workouts, setWorkouts] = useState([]);
  const [userInfo, setUserInfo]=useState([])
  const sampleData = [{id: 1, title: "Workout 1", duration: "15 min", user: "Tim Nelson", thumbnail: "https://blog.fitbit.com/wp-content/uploads/2018/08/0816-summer-workouts-HERO.jpg", category: "cardio", tags: ["arms", "abs"]}, {id: 2, title: "Workout 2", duration: "30 min", user: "Spike", thumbnail: "https://cdn10.phillymag.com/wp-content/uploads/2016/12/running-shoe-cecilie-arcurs-istock-940x540.jpg", category: "bodyweight", tags: ["legs"]}, 
  {id: 3, title: "Workout 3", duration: "20 min", user: "Andy Van Dam", thumbnail: "https://content.active.com/Assets/Active.com+Content+Site+Digital+Assets/Fitness/Articles/Twice+a+Day/man+working+out-carousel.jpg", category: "weights", tags: ["legs", "abs"]}];

  const [following,setFollowing]=useState([])
  const [followCount, setFollowCount]= useState(0)

  //let allFollowing = []; // results of getFollowing
  const displayFollowing = []; // set to allFollowing

  // after unfollow
  // splice the user from displayFollowing and rerender the component with displayFollowing

  useEffect(() => {

    //getWorkouts();
    //allFollowing = getAllFollowing()
    getAllFollowing();
    //getUserWorkouts();
    renderWorkouts();
  },[]);

  // sets state variable
  const renderWorkouts = () => {
    setWorkouts(sampleData.map((exercise) => <Workout key={exercise.id} id={exercise.id} title={exercise.title} duration={exercise.duration} user={exercise.user} thumbnail={exercise.thumbnail}/>))
  }

  // makes an api request and sets initial state variable
  const getUserWorkouts = async () => {
    getWorkouts(props.user).then(result => {
      console.log("got workouts!")
      setWorkouts(result);
    });
  }
  /*
        <div id = "leftside">
            <div id = "prof-card">
                <ExpandedUserProfile/>
            </div>
            <p>{props.user}</p>
            <div className="profile-workouts">
            {workouts}
            </div>
        </div>

          <Profile/>

   */
  useEffect(() => {



  },[following]);//when following is actually set
  const getAllFollowing = async () => {
    console.log(props.user)
    getFollowing(props.user).then(result => {
      console.log(result)
      setFollowing(result)
      setFollowCount(result.length)
      console.log(followCount)
      

      /*
      const data = Object.values(result)
      const keys = Object.keys(result)
      let exerciseList = [];
      for (let i = 0; i < keys.length; i++) {
          // const item = <ExerciseItem key={keys[i]} data={data[i]}/>
          const opt = <option value={keys[i]}>{data[i][6]}</option>
          exerciseList.push(opt)
      }
      console.log(exerciseList)

       */
      //assuming it returns an array of usernames


    });
  }

  return (
    <div className="profile-page">
      <div id = "left-side">
        <div id = "prof-card">
          <ExpandedUserProfile user = {props.user} following = {followCount}></ExpandedUserProfile>
        </div>
        <p>{props.user}</p>
        <div className="profile-workouts">
          {workouts}
        </div>
      </div>
        <div id = "right-side">
            <Following user = {props.user} following = {following}></Following>
        </div>

    </div>
  );
}
export default ProfilePage
