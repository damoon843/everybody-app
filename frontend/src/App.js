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

function App() {
  document.body.style = 'background-color: #f2f4f5; font-family: "Overpass", sans-serif;';
  let username = useRef("");
  let userData = useRef({});
  let workout = useRef({});
  let recs = useRef([]);
  let myWorkouts = useRef([]);
  let likedWorkouts = useRef([]);
  let exercises = useRef({});
  let allExercises = useRef([]);

  const changeUsername = (newName) => {
    username.current = newName;
  }

  const changeUserData = (data) => {
    userData.current = data;
  }

  const changeWorkout = (newWorkout) => {
    workout.current = newWorkout
  }

  const changeRecs = (newRecs) => {
    recs.current = newRecs
  }

  const changeMyWorkouts = (newWorkouts) => {
    myWorkouts.current = newWorkouts
  }

  const changeLikedWorkouts = (newWorkouts) => {
    likedWorkouts.current = newWorkouts
  }

  const changeExercises = (newExercises) => {
    exercises.current = newExercises
  }

  const changeAllExercises = (newExercises) => {
    allExercises.current = newExercises
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
          <ProfilePage changeWorkout={changeWorkout} username={username} userData={userData} changeUserData={changeUserData}/>
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
