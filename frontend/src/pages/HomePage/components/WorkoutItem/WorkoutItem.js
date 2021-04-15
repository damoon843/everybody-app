import React, { useEffect, useState } from 'react'; 
import './WorkoutItem.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function WorkoutItem(props){
  const [following, setFollowing] = useState(props.following)
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(parseInt(props.likeCount))
  const url = "/workout/" + props.id

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

  const likePost = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      workoutName: props.name,
      poster: props.postingUser
    }
    await axios.post(
        "http://localhost:4567/registerLike",
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

  const unlikePost = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
        "withCredentials": "true"
      }
    }
    let toSend = {
      workoutName: props.name,
      poster: props.postingUser
    }
    await axios.post(
        "http://localhost:4567/unregisterLike",
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

  const toggleLike = () => {
    if (like) {
      unlikePost().then(response => {
        setLike(false)
        const newCount = likeCount - 1
        setLikeCount(newCount)
      })
    } else {
      likePost().then(response => {
        setLike(true)
        const newCount = likeCount + 1
        console.log(newCount)
        setLikeCount(newCount)
      })
    }
  }

  useEffect(() => {
  }, [following, like, likeCount])

  return(
    <div className="workout-item">
      <div className="workout-title">
        <h4>{props.name}</h4>
        <div className="workout-likes">
          <p className="like">{likeCount}</p>
          {like
          ? <button className="like-btn" onClick={toggleLike}><FontAwesomeIcon className="liked" icon={faHeart} /></button>
          : <button className="like-btn" onClick={toggleLike}><FontAwesomeIcon className="unliked" icon={faHeart} /></button>}
        </div>
      </div>
      
      <div className="workout-user">
        <p className="workout-posting-user">{props.postingUser}</p>
        <div>
        {following 
        ? <button className="following-btn" onClick={toggleFollowing}>Following</button> : <button className="follow-btn" onClick={toggleFollowing}>Follow</button>}
        </div>
      </div>
      <p>Duration: {Math.floor(props.duration/60)} minutes</p>
      <p>Description: {props.description}</p>
      <a href={url} className="submit-btn start-workout-btn">Start workout</a>
    </div>
  );
}
export default WorkoutItem