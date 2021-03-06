import React from 'react'; 
import {Tabs, Tab} from 'react-bootstrap';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import './LoginPage.css';
import {getRadioVal} from '../../calculations';

/**
 * The Login page. Has options for new users to signup or returning users to login back into their account.
 * @param {*} props the function to change the value of the username ref.
 * @returns the login page.
 */
function LoginPage(props) {
  /**
   * Gets the sign up information entered into the form. First time users will have their inputted information stored so that it is sent to database
   * @returns an object representing the values the user signed up with.
   */
  const getSignUpVals = () => {
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
    return toSend;
  }

  /**
   * Gets the values of the login credentials. Returning users will only need their username and password, which is retrieved by the input into the text box
   * @returns an object representing the values the user logs in with.
   */
  const getLoginVals = () => {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const toSend = {
      username: username,
      password: password,
    };
    return toSend;
  }

  /**
   * Sends the new user information to the database.
   * @param {*} e the event to create a new user on
   */
  const createUser = async (e) => {
    e.preventDefault();
    
    let err = document.getElementById("err-msg-signup")
    err.innerText = ""

    const data = getSignUpVals()

    // check if the user has filled in all the values of the signup form
    if (!data.firstName || !data.lastName || !data.username || !data.password || !data.workoutType || !data.workoutDuration) {
      err.innerText = "Please fill out all fields."
    } else {
      const toSend = JSON.stringify(data);
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      await axios.post(
        "http://localhost:4567/newUser",
        toSend,
        config
      )
      .then(response => {
        // if the query is successful, redirect the user to the home page
        if (response.data.queryStatus === "success") {
          props.changeUsername(data.username)
          props.history.push('/home');
        }
      })
      .catch(function (error) {
        err.innerText = "Error: could not create account."
        console.log(error);
      });
    }
 
  }

  /**
   * Sends the information in the login field, validates the user login, and sets the user information in the App.js parent
   * @param {*} e the event to log in the user on
   */
  const loginUser = async (e) => {
    e.preventDefault()
    let err = document.getElementById("err-msg-login")
    err.innerText = ""
    const data = getLoginVals()
    // check if the user has filled out all login fields
    if (!data.username || !data.password) {
      err.innerText = "Please fill out all fields."
    } else {
      const toSend = JSON.stringify(data);
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      await axios.post(
        "http://localhost:4567/login",
        toSend,
        config
      )
      .then(response => {
        // if the login is successful, redirect to the home page
        if (response.data.status === "Log-in succeeded.") {
          props.changeUsername(data.username)
          props.history.push('/home');
        }
      })
      .catch(function (error) {
        err.innerText = "Error: could not log in."
        console.log(error);
      });
    }
  }

  return (
    <div className="login-page fade-in">
        <div className="login-card">
        <div className="login-top">
          <h1>everyBODY</h1>
          <p>Fitness curated by all, for all.</p>
        </div>
          <Tabs className="login-tabs" defaultActiveKey="login">
            <Tab className="login-tab" eventKey="login" title="Login">
              <form action="/home" className="login-form">
                <div className="login-form-section">
                  <label className="login-label">Username
                    <input id="username" name="username" type="text" placeholder="Enter username" required/>
                  </label>
                </div>
                <div className="login-form-section">
                  <label className="login-label">Password
                  <input id="password" name="password" type="password" placeholder="Enter password" required/>
                  </label>
                </div>
                <button className="btn submit-btn" id="login-btn" onClick={loginUser}>
                  Log in
                </button>
                <p id="err-msg-login"></p>
              </form>
            </Tab>
            <Tab className="login-tab" eventKey="signup" title="Sign up">
              <form action="/home" className="signup-form">
                <div className="login-form-section">
                  <label className="login-label">First name<input id="firstName" name="firstName" type="text" placeholder="Enter first name" required/></label>
                  
                </div>
                <div className="login-form-section">
                  <label className="login-label">Last name<input id="lastName" name="lastName" type="text" placeholder="Enter last name" required/></label>
                  
                </div>
                <div className="login-form-section">
                  <label className="login-label">Username<input id="newUsername" name="newUsername" type="text" placeholder="Enter username" required/></label>
                  
                </div>
                <div className="login-form-section">
                  <label className="login-label">Password<input id="newPassword" name="newPassword" type="password" placeholder="Enter password" required/></label>
                  
                </div>
                <div className="login-form-row">
                  <div className="login-form-section">
                    <p>Type Preference</p>
                    <div className="login-radio-row">
                      
                      <label className="radio-label"><input type="radio" id="cardio-pref" name="type-pref" value="cardio" required defaultChecked/>Cardio</label>
                    </div>
                    <div className="login-radio-row">
                      
                      <label className="radio-label"><input type="radio" id="bodyweight-pref" name="type-pref" value="bodyweight"/>Bodyweight</label>
                    </div>
                  </div>
                  <div className="login-form-section">
                    <p>Duration Preference</p>
                    <div className="login-radio-row">
                      
                      <label className="radio-label"><input type="radio" id="duration-1" name="duration-pref" value="0" required defaultChecked/>0-30 minutes</label>
                    </div>
                    <div className="login-radio-row">
                      
                      <label className="radio-label"><input type="radio" id="duration-2" name="duration-pref" value="1"/>30-60 minutes</label>
                    </div>
                    <div className="login-radio-row">
                      
                      <label className="radio-label"><input type="radio" id="duration-3" name="duration-pref" value="2"/>60+ minutes</label>
                    </div>
                  </div>
                </div>
                <div> Note: We only collect your preferences to tailor your recommendation feed. Your preferences and name will also be shown on your profile. Please reach out to our team for detailed information.</div>
                <button className="btn submit-btn" id="signup-btn" onClick={createUser}>
                  Sign Up
                </button>
                <p id="err-msg-signup"></p>
              </form>
            </Tab>
          </Tabs>
        </div>
    </div>
  );
}

export default withRouter(LoginPage);