import React, { useEffect, useState } from 'react'; 
import './WorkoutItemHome.css';
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {followUser, unfollowUser, likePost, unlikePost} from '../../../../api.js';

function WorkoutItemHome(props){
  const [following, setFollowing] = useState(props.workout.following === 'true')
  const [like, setLike] = useState(false)
  const [likeCount, setLikeCount] = useState(parseInt(props.workout.like_count))
  const url = "/workout/" + props.workout.workout_id

  const updateWorkout = () => {
    props.changeWorkout(props.workout)
  }

  const toggleFollowing = () => {
    const toSend = {
      username: props.username,
      following: props.workout.posting_user
    }
    if (following) {
      unfollowUser(toSend).then(response => {
        setFollowing(false)
      })
    } else {
      followUser(toSend).then(response => {
        setFollowing(true)
      })
    }
  }

  const toggleLike = () => {
    let toSend = {
      workoutName: props.workout.workout_name,
      poster: props.workout.posting_user
    }
    if (like) {
      unlikePost(toSend).then(response => {
        setLike(false)
        const newCount = likeCount - 1
        setLikeCount(newCount)
      })
    } else {
      likePost(toSend).then(response => {
        setLike(true)
        const newCount = likeCount + 1
        setLikeCount(newCount)
      })
    }
  }

  useEffect(() => {
  }, [following, like, likeCount])

  return(

    <Card className="workout-item">
      <Card.Img alt="workout item thumbnail" variant="top" src="https://runningmagazine.ca/wp-content/uploads/2013/07/164767502.jpg" />
      <Card.Body>
        <div className="workout-title">
          <h4>{props.workout.workout_name}</h4>
          <div className="workout-likes">
            <p className="like">{likeCount}</p>
            {like
            ? <button className="like-btn" onClick={toggleLike}><FontAwesomeIcon className="liked" icon={faHeart} /></button>
            : <button className="like-btn" onClick={toggleLike}><FontAwesomeIcon className="unliked" icon={faHeart} /></button>}
          </div>
        </div>
        <div className="workout-user">
          <p className="workout-posting-user">{props.workout.posting_user}</p>
          <div>
            {following 
            ? <button className="following-btn" onClick={toggleFollowing}>Following</button> : <button className="follow-btn" onClick={toggleFollowing}>Follow</button>}
          </div>
        </div>
        <div>
          <p>Duration: {Math.floor(props.workout.duration/60)} minutes<br></br>Description: {props.workout.description}</p>
          <Link className="link-btn" onClick={updateWorkout} to={url}><button className="start-workout-btn submit-btn">Start Workout</button></Link>
        </div>
      </Card.Body>
    </Card>
  );
}
export default WorkoutItemHome