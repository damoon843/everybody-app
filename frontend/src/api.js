import axios from 'axios';
// import userSession from './userSession.js'

/** GET REQUESTS */

// gets an existing workout
// id: the workout's unique ID
export const getWorkout = async (id) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.get(
      "http://localhost:4567/getWorkout/" + id,
      config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

// gets all exercises in the database, regardless of user
export const getAllExercises = async () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  let res = await axios.get(
    "http://localhost:4567/publicExercises",
    config
  )
  return res.data
}

// follows a user
// data: information about the user and following
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
    console.log(document.cookie)
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

// follows a user
// data: information about the user and following
export const unfollowUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "http://localhost:4567/unfollow",
    toSend,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

