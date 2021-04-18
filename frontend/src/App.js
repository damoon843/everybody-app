import React, {useRef} from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExercisePage from './pages/ExercisePage/ExercisePage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import Toolbar from './components/Toolbar/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';
require('dotenv').config();

/**
 * The base of the app. Sets up the routes to each page.
 * 
 * @returns the routes to each page
 */
function App() {
  // set the styling for the overall app
  document.body.style = 'background-color: #f2f4f5; font-family: "Overpass", sans-serif;';
  
  // store the user's username, user data, workouts, liked workouts, and the workout to be displayed on the individual workout page
  let username = useRef("");
  let userData = useRef({});
  let myWorkouts = useRef([]);
  let likedWorkouts = useRef([]);
  let workout = useRef({});

  /**
   * Change the value of the username ref
   * 
   * @param {*} newName the name to change the username ref to
   */
  const changeUsername = (newName) => {
    username.current = newName;
  }

  /**
   * Change the value of the userData ref
   * 
   * @param {*} data the data to change the userData ref to
   */
  const changeUserData = (data) => {
    userData.current = data;
  }

  /**
   * Change the value of the workout ref
   * 
   * @param {*} newWorkout the workout to change the current workout ref to
   */
  const changeWorkout = (newWorkout) => {
    workout.current = newWorkout
  }

  /**
   * Change the value of the myWorkouts ref
   * 
   * @param {*} newWorkouts the list of my workouts to change to
   */
  const changeMyWorkouts = (newWorkouts) => {
    myWorkouts.current = newWorkouts
  }

  /**
   * Change the value of the likedWorkouts ref
   * 
   * @param {*} newWorkouts the list of liked workouts to change to
   */
  const changeLikedWorkouts = (newWorkouts) => {
    likedWorkouts.current = newWorkouts
  }

  return (
    <Router>
      <Switch>
        <Route path="/workout/:id">
          <Toolbar changeUsername={changeUsername} />
          <WorkoutPage changeWorkout={changeWorkout} workout={workout} username={username} />
        </Route>
        <Route path="/exercises">
          <Toolbar changeUsername={changeUsername} />
          <ExercisePage />
        </Route>
        <Route path="/profile">
          <Toolbar changeUsername={changeUsername} />
          <ProfilePage changeWorkout={changeWorkout} username={username} userData={userData} changeUserData={changeUserData} changeMyWorkouts={changeMyWorkouts} changeLikedWorkouts={changeLikedWorkouts} myWorkouts={myWorkouts} likedWorkouts={likedWorkouts} />
        </Route>
        <Route path="/home">
          <Toolbar changeUsername={changeUsername} />
          <HomePage changeWorkout={changeWorkout} username={username} />
        </Route>
        <Route path="/">
          <LoginPage changeUsername={changeUsername}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
