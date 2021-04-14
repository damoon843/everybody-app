import React, { useState, useRef } from "react";
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ExercisePage from './pages/ExercisePage/ExercisePage';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import WorkoutPage from './pages/WorkoutPage/WorkoutPage';
import Toolbar from './components/Toolbar/Toolbar';
import { Auth0Provider } from "@auth0/auth0-react";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  document.body.style = 'background-color: #f2f4f5; font-family: "Overpass", sans-serif;';
  const home = window.location.origin + "/home"
  const [user, setUser] = useState("");

  const userRef = useRef("");

  const changeRef = (val) => {
    userRef.current = val
    console.log(userRef.current)
  }

  const setUsername = (username) => {
    setUser(username)
  }

  return (
    <Auth0Provider domain="hidden-truth-6529.us.auth0.com" clientId="KBV5chpfuBUCgg6sFzIkjZUVbsFqxQ5b" redirectUri={home}>
      <Router>
          <Switch>
            <Route path="/workout/:id">
              <Toolbar />
              <WorkoutPage />
            </Route>
            <Route path="/exercises">
              <Toolbar />
              <ExercisePage />
            </Route>
            <Route path="/profile">
              <Toolbar />
              <ProfilePage user={user} />
            </Route>
            <Route path="/home">
              <Toolbar />
              <HomePage user={user} />
            </Route>
            <Route path="/">
              <LoginPage setUsername={setUsername} userRef={userRef} changeRef={changeRef}/>
            </Route>
          </Switch>
      </Router>
    </Auth0Provider>
  );
}

export default App;
