import React, { useEffect } from 'react';
import axios from 'axios';
import './ProfileCard.css';

function ProfileCard(props) {

  return (
    <div className="profile-card">
      <h1>{props.user.firstName} {props.user.lastName}</h1>
      <button className="following-list">View All Following</button>
    </div>
  );
}

export default ProfileCard;