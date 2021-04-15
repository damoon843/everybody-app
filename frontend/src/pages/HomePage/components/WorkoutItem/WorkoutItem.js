import React, { useEffect, useState } from 'react'; 
import './WorkoutItem.css';
import axios from 'axios';

function WorkoutItem(props){
  const [following, setFollowing] = useState(props.following)

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
  }, [following])

  return(
    <div className="workout-item">
      <h4>{props.name}</h4>
      <div className="workout-user">
        <p className="workout-posting-user">{props.postingUser}</p>
        <div>
        {following 
        ? <button className="following-btn" onClick={toggleFollowing}>Following</button> : <button className="follow-btn" onClick={toggleFollowing}>Follow</button>}
        </div>
      </div>
      <p>Duration: {Math.floor(props.duration/60)} minutes</p>
      <p>Description: {props.description}</p>
      <p>Created at: {props.createdAt}</p>
    </div>
  );
}
export default WorkoutItem