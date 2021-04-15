import React, { useEffect, useState, useRef } from 'react'; 
import './WorkoutItem.css';
// import { followUser } from '../../../../api';
import axios from 'axios';

function WorkoutItem(props){
  const [following, setFollowing] = useState(props.following)
  let followBtn = useRef(null)

  const followUser = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      username: props.username.current,
      following: props.postingUser
    }
    await axios.post(
        "http://localhost:4567/follow",
        toSend,
        config
    )
    .then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const unfollowUser = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      username: props.username.current,
      following: props.postingUser
    }
    await axios.post(
        "http://localhost:4567/unfollow",
        toSend,
        config
    )
    .then(response => {
      console.log(response)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const toggleFollowing = () => {
    if (following) {
      unfollowUser().then(response => {
        setFollowing(false)
      })
    } else {
      followUser().then(response => {
        setFollowing(true)
      })
    }
  }

  useEffect(() => {
    if (following) {
      followBtn.current = <button onClick={toggleFollowing}>following</button>
    } else {
      followBtn.current = <button onClick={toggleFollowing}>follow</button>
    }
  }, [following])

  return(
    <div className="workout-container">
      <h4>{props.name}</h4>
      <div className="workout-poster">
        <h5>{props.postingUser}</h5>
      </div>
      <p>Description: {props.description}</p>
      {followBtn}
    </div>
  );
}
export default WorkoutItem