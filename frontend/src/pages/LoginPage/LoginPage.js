import React from 'react'; 
import {Tabs, Tab} from 'react-bootstrap';
import { createUser, loginUser } from '../../api';
import { withRouter } from 'react-router-dom';
import './LoginPage.css';

function LoginPage(props) {

  const getRadioVal = (element) => {
    const options = document.getElementsByName(element);
    let val = "";
    options.forEach(elt => {
      if (elt.checked) {
        val = elt.value;
      }
    })
    return val;
  }

  const signUp = (e) => {
    e.preventDefault();
    const firstName = document.getElementById('firstName').value;
    const lastName = document.getElementById('lastName').value;
    const newUsername = document.getElementById('newUsername').value;
    const newPassword = document.getElementById('newPassword').value;
    const workoutType = getRadioVal('type-pref');
    const workoutDuration = getRadioVal('duration-pref');
    const toSend = {
      firstName: firstName,
      lastName: lastName,
      username: newUsername,
      password: newPassword,
      workoutType: workoutType,
      workoutDuration: workoutDuration
    };
    createUser(toSend).then(result => {
      props.changeRef(newUsername)
      props.setUsername(newUsername);
      props.history.push('/home');
    });
  }

  const login = (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const toSend = {
      username: username,
      password: password,
    };
    loginUser(toSend).then(result => {
      props.changeRef(username)
      props.setUsername(username);
      props.history.push('/home');
    });
  }

  return (
    <div className="login-page row">
      <div className="login-section login-image">
        <img alt="login half page" src="https://static01.nyt.com/images/2020/03/10/well/physed-immune1/physed-immune1-mediumSquareAt3X.jpg" id="login-img" />
      </div>
      <div className="login-section col">
        <div className="login-top">
          <h1>everyBODY</h1>
          <p>Fitness curated by all, for all.</p>
        </div>
        <div className="login-card">
          <Tabs className="login-tabs" defaultActiveKey="login">
            <Tab eventKey="login" title="Login">
              <form action="/home" className="login-form">
                <div className="login-form-section">
                  <label for="username">Username</label>
                  <input id="username" name="username" type="text" placeholder="Enter username" required/>
                </div>
                <div className="login-form-section">
                  <label for="password">Password</label>
                  <input id="password" name="password" type="password" placeholder="Enter password" required/>
                </div>
                <button className="btn submit-btn" id="login-btn" onClick={login}>
                  Log in
                </button>
              </form>
            </Tab>
            <Tab eventKey="signup" title="Sign up">
              <form action="/home" className="signup-form">
                <div className="login-form-section">
                  <label for="firstName">First name</label>
                  <input id="firstName" name="firstName" type="text" placeholder="Enter first name" required/>
                </div>
                <div className="login-form-section">
                  <label for="lastName">Last name</label>
                  <input id="lastName" name="lastName" type="text" placeholder="Enter last name" required/>
                </div>
                <div className="login-form-section">
                  <label for="newUsername">Username</label>
                  <input id="newUsername" name="newUsername" type="text" placeholder="Enter username" required/>
                </div>
                <div className="login-form-section">
                  <label for="newPassword">Password</label>
                  <input id="newPassword" name="newPassword" type="password" placeholder="Enter password" required/>
                </div>
                <div className="login-form-row">
                  <div className="login-form-section">
                    <p>Type Preference</p>
                    <div className="login-radio-row">
                      <input type="radio" id="cardio-pref" name="type-pref" value="cardio" required checked/>
                      <label className="radio-label" for="cardio-pref">Cardio</label>
                    </div>
                    <div className="login-radio-row">
                      <input type="radio" id="bodyweight-pref" name="type-pref" value="bodyweight"/>
                      <label className="radio-label" for="bodyweight-pref">Bodyweight</label>
                    </div>
                  </div>
                  <div className="login-form-section">
                    <p>Duration Preference</p>
                    <div className="login-radio-row">
                      <input type="radio" id="duration-1" name="duration-pref" value="0" required checked/>
                      <label className="radio-label" for="duration-1">0-30 minutes</label>
                    </div>
                    <div className="login-radio-row">
                      <input type="radio" id="duration-2" name="duration-pref" value="1"/>
                      <label className="radio-label" for="duration-2">30-60 minutes</label>
                    </div>
                    <div className="login-radio-row">
                      <input type="radio" id="duration-3" name="duration-pref" value="2"/>
                      <label className="radio-label" for="duration-3">60+ minutes</label>
                    </div>
                  </div>
                </div>
                <button className="btn submit-btn" id="signup-btn" onClick={signUp}>
                  Sign Up
                </button>
              </form>
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginPage);