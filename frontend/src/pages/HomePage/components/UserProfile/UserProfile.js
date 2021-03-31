import React, {useEffect} from 'react';
import './UserProfile.css';

function UserProfile() {
  let userInfo = {name: "Jane Doe", followerCount: 123, followingCount: 456, workoutCount: 2};

  useEffect(() => {
    getUserInfo();
  }); 

  // TODO: fill this out with a GET request
  const getUserInfo = () => {
  }

  return (
    <div className="user-profile">
      <img src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg" alt="user profile" id="profile-pic" />
      <h3 id="name">{userInfo.name}</h3>
      <div className="follow-container">
        <div className="follow-info">
          <p id="followers">Followers</p>
          <h5 id="follower-ct">{userInfo.followerCount}</h5>
        </div>
        <div className="follow-info">
          <p id="following">Following</p>
          <h5 id="following-ct">{userInfo.followingCount}</h5>
        </div>
        <div className="follow-info">
          <p id="workouts">Workouts</p>
          <h5 id="workout-ct">{userInfo.workoutCount}</h5>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;