import React, {useEffect, useState} from 'react';
import './ProfilePage.css';
import ProfileCard from "./components/ProfileCard/ProfileCard";
import WorkoutItemProfile from "./components/WorkoutItemProfile/WorkoutItemProfile";
import axios from 'axios';

/**
 * Displays the Profile page.
 * 
 * @param {*} props takes in the current user, the user's workouts, all their liked workouts, and the respective functions changing their value.
 * @returns the profile page
 */
function ProfilePage(props){
  // marker variable to render the profile card
  const [render, setRender] = useState("");
  // state variables for displaying user info, workouts, liked workouts, and toggling between workouts
  const [userData, setUserData] = useState({})
  const [userWorkouts, setUserWorkouts] = useState([]);
  const [likedWorkouts, setLikedWorkouts] = useState([]);
  const [toggleLiked, setToggle] = useState(false);

  useEffect(() => {
    getUser();
    getLikedWorkouts();
    getUserWorkouts();
  }, [render]);

  // function to rerender the profile card upon change
  const rerender = (val) => {
    setRender(val);
  }

  /**
   * Gets user information and updates the userData ref in App.js.
   */
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
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Gets the workouts posted by the current user. Updates the myWorkouts ref in App.js.
   */
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
      props.changeMyWorkouts(data.map((workout) => <WorkoutItemProfile changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>))
      setUserWorkouts(props.myWorkouts.current)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  /**
   * Gets all the workouts the current user has liked. Updates the likedWorkouts ref in App.js.
   */
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
          props.changeLikedWorkouts(data.map((workout) => <WorkoutItemProfile changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>))
          setLikedWorkouts(props.likedWorkouts.current)
        })
        .catch(function (error) {
          console.log(error);
        });
  }

  /**
   * Toggles the display for showing liked workouts versus my workouts.
   */
  const toggle = () => {
    let val = toggleLiked
    setToggle(!val)
  }

  return (
    <div className="profile-page fade-in">
      <ProfileCard id="profile-card" userData={userData} rerender={rerender} username={props.username} />
      <div className="workout-wrapper">
          {
            toggleLiked ?
            <div className="myWorkouts">
              <div className="workout-header">
                <h3 id="myWorkouts">Liked Workouts</h3>
                <button onClick={toggle} className="toggle-btn profile-toggle">Show my workouts</button>
              </div>
              <div className="liked-workouts">
                {likedWorkouts}
              </div>
            </div>
            :
            <div className="myWorkouts">
              <div className="workout-header">
                <h3 id="myWorkouts">My Workouts</h3>
                <button onClick={toggle} className="toggle-btn profile-toggle">Show liked workouts</button>
              </div>
              <div className="profile-workouts">
                {userWorkouts}
              </div>
            </div>
          }
      </div>
    </div>
  );
}
export default ProfilePage
