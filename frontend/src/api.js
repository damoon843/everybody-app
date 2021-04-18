import axios from 'axios'

/*
This file contains requests for following/unfollowing as well as liking/unliking
 */

/**
 * Follows a given user.
 * @param {*} toSend an object of {user, following}, where user represents the current user's username and following represents the user to follow.
 */
export const followUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "withCredentials": "true"
    }
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

/**
 * Unfollows a given user.
 * @param {*} toSend an object of {user, following}, where user represents the current user's username and following represents the user to unfollow.
 */
export const unfollowUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "withCredentials": "true"
    }
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

/**
 * Likes a given post.
 * @param {*} toSend an object of {workoutName, poster}, where workoutName represents the name of the workout to like and poster represents the user who posted the workout.
 */
export const likePost = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "withCredentials": "true"
    }
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

/**
 * 
 * @param {*} toSend an object of {workoutName, poster}, where workoutName represents the name of the workout to unlike and poster represents the user who posted the workout.
 */
export const unlikePost = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
      "withCredentials": "true"
    }
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