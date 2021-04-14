import React, { useEffect } from 'react';
import axios from 'axios';
import './ProfileCard.css';

let userData = {}

function ProfileCard(props) {
  useEffect(() => {
    getUser();
  }); 

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
      console.log(response.data)
      userData = response.data
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
  }

  return (
    <div className="profile-card">
      <h1>{userData.firstName} {userData.lastName}</h1>
      <button className="following-list">View All Following</button>
    </div>
  );
}

export default ProfileCard;