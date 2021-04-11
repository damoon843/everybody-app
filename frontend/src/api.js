import axios from 'axios';

/** GET REQUESTS */

// gets workout recommendations for a specific user
// username: the user's username
export const getRecommendations = async (username) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.get(
    "http://localhost:3000/getRecommendations/" + username,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}

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
      "http://localhost:3000/getWorkout/" + id,
      config
  )
  .then(response => {
    return response;
  })
  .catch(function (error) {
    console.log(error);
  });
}

/** POST REQUESTS */

// posts a new workout
// data: information about the workout
export const postWorkout = async (data) => {
  const toSend = {
    title: data.title,
    description: data.description,
    exercises: data.exercises
  };
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    // fix this address/endpoint
    "http://localhost:3000/postWorkout",
    toSend,
    config
  )
  .then(response => {
    return response
  })
  .catch(function (error) {
    console.log(error);
  });
}