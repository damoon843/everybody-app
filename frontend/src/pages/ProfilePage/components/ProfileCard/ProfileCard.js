import React, {useState, useEffect} from 'react';
import { getUser } from '../../../../api';
import './ProfileCard.css';

function ProfileCard() {
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserInfo();
  }); 

  const getUserInfo = () => {
    getUser.then(result => {
      console.log(result);
      setUser(result);
    })
  }

  return (
    <div className="expanded-user-profile">
      <img src="https://st3.depositphotos.com/4111759/13425/v/600/depositphotos_134255532-stock-illustration-profile-placeholder-male-default-profile.jpg" alt="user profile" id="exp-profile-pic" />
      <h3 id="exp-name">{user.firstName} + {user.lastName}</h3>
      <div className="exp-follow-container">
        <div className="exp-follow-info">
          <p id="workouts">Workouts</p>
          <h5 id="workout-ct">{user.workoutCount}</h5>
        </div>
      </div>
    </div>
  );
}

export default ProfileCard;