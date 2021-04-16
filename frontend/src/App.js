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
require('dotenv').config()

function App() {
  document.body.style = 'background-color: #f2f4f5; font-family: "Overpass", sans-serif;';
  let username = useRef("")
  let workout = useRef({})

  const changeUsername = (newName) => {
    username.current = newName;
  }

  const changeWorkout = (newWorkout) => {
    console.log(workout.current)
    workout.current = newWorkout
  }

  return (
    <Router>
      <Switch>
        <Route path="/workout/:id">
          <Toolbar changeUsername={changeUsername} />
          <WorkoutPage workout={workout} username={username} />
        </Route>
        <Route path="/exercises">
          <Toolbar changeUsername={changeUsername} />
          <ExercisePage />
        </Route>
        <Route path="/profile">
          <Toolbar changeUsername={changeUsername} />
          <ProfilePage changeWorkout={changeWorkout} username={username}/>
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
