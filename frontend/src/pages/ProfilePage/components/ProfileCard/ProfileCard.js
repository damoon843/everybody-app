import React, {useState, useEffect} from 'react';
import axios from 'axios';
import './ProfileCard.css';

function ProfileCard(props) {
  const [user, setUser] = useState({});

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
      username: props.user
    };
    await axios.post(
      "http://localhost:4567/userInfo",
      toSend,
      config
    )
    .then(response => {
      setUser(response.data)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="profile-card">
      <div className="profile-img-container">
        <img className="profile-pic" alt="user profile" src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg" />
      </div>
      <div className="user-info">
        <h1>{user.firstName} {user.lastName}</h1>
        <button className="following-list">View All Following</button>
      </div>
    </div>
  );
}

export default ProfileCard;