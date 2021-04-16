import React, { useState, useEffect } from 'react'; 
import './WorkoutPage.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import ExerciseItem from './components/ExerciseItem/ExerciseItem'

// const workout = {workout_name: "Sample Workout Name", workout_id: 1 , posting_user: "johnnyappleseed", created_at: "2021-04-15", description: "This is the description of the sample workout.", duration: 180, media_link: "google.com", like_count: 5, following: false}

function WorkoutPage(props) {
  const [following, setFollowing] = useState(props.workout.following)
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(parseInt(props.workout.like_count))

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
      following: props.workout.posting_user
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
      following: props.workout.posting_user
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
      workoutName: props.workout.workout_name,
      poster: props.workout.posting_user
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
      workoutName: props.workout.workout_name,
      poster: props.workout.posting_user
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
    console.log(props.workout)
  }, [following, like, likeCount])

  return (
    <div className="workout-page fade-in">
      <div className="workout-page-container">
        <div className="workout-info">
          <div className="workout-detail-title">
            <h1 id="workout-title">{props.workout.workout_name}</h1>
            <div className="workout-likes-detail">
              {like
              ? <button className="like-btn-detail" onClick={toggleLike}><FontAwesomeIcon className="liked-detail" icon={faHeart} /></button>
              : <button className="like-btn-detail" onClick={toggleLike}><FontAwesomeIcon className="unliked-detail" icon={faHeart} /></button>}
              <h5 className="like">{likeCount}</h5>
            </div>
          </div>
          <h2>{props.workout.description}</h2>
          <div className="workout-detail-user">
            <h4 id="workout-detail-poster">{props.workout.posting_user}</h4>
              {following 
            ? <button className="detail-following-btn" onClick={toggleFollowing}>Following</button> : <button className="detail-follow-btn" onClick={toggleFollowing}>Follow</button>}
          </div>
          <div className="additional-details">
            <p>Estimated duration: {Math.floor(props.workout.duration/60)} minutes <br></br> Created: {props.workout.created_at}</p>
          </div>
        </div>
        <hr></hr>
        <h2 id="workout-subheading">Exercises</h2>
        <ExerciseItem/>
      </div>
    </div>
  );
}

export default WorkoutPage
