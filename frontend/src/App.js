import React, {useRef} from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import ExercisePage from './pages/ExercisePage/ExercisePage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import Toolbar from './components/Toolbar/Toolbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  document.body.style = 'background-color: #f2f4f5; font-family: "Overpass", sans-serif;';
  const username = useRef("")

  const changeUsername = (newName) => {
    username.current = newName;
  }

  return (
    <Router>
      <Switch>
        <Route path="/workout/:id">
          <Toolbar />
          <WorkoutPage />
        </Route>
        <Route path="/exercises">
          <Toolbar />
          {/* <ExercisePage /> */}
        </Route>
        <Route path="/profile">
          <Toolbar />
          <ProfilePage username={username}/>
        </Route>
        <Route path="/home">
          <Toolbar />
          <HomePage username={username} />
        </Route>
        <Route path="/">
          <LoginPage changeUsername={changeUsername}/>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
