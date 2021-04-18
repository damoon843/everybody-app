import React, { useEffect, useState } from 'react'; 
import './WorkoutItemHome.css';
import {Card} from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import {Link} from 'react-router-dom';
import {followUser, unfollowUser, likePost, unlikePost} from '../../../../api.js';

/**
 * Workout item serves as the "card" displayed on the recommended feed, which houses the workout specific data and allows for interaction with following and likes. The 'start workout' button links to the url retrieved by the request.
 * @param {*} props the workout data
 * @returns a component representing a workout item
 */
function WorkoutItemHome(props){
  // state variable for user to follow/unfollow the workout poster
  const [following, setFollowing] = useState(props.workout.following === 'true')
  // state variable for user to like/unlike a workout
  const [like, setLike] = useState(false)
  // state variable to show how many likes the workout has
  const [likeCount, setLikeCount] = useState(parseInt(props.workout.like_count))
  // the url to redirect to when the user clicks on the "start workout" button
  const url = "/workout/" + props.workout.workout_id

  /**
   * Updates the workout useRef in App.js
   */
  const updateWorkout = () => {
    props.changeWorkout(props.workout)
  }

  /**
   * Toggles the following button and calls follow/unfollow.
   */
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

  /**
   * Toggles the like button and calls like/unlike.
   */
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
      <Card.Img alt="workout item thumbnail" variant="top" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9sp0U82qOF8DUvVZt0pgIp03jhi7tQxdCpg&usqp=CAU" />
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