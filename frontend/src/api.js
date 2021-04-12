import axios from 'axios';
import userSession from './userSession.js'

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
  const toSend = {
    username: username
  };
  await axios.post(
    "http://localhost:4567/getRecommendations",
    toSend,
    config,
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

// gets workouts for a specific user
// username: the user's username
export const getWorkouts = async (username) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  const toSend = {
    username: username
  };
  await axios.post(
    "http://localhost:4567/userWorkouts",
    toSend,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
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
      "http://localhost:4567/getWorkout/" + id,
      config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
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
  await axios.get(
    "http://localhost:4567/exercises",
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

// gets user data
export const getUser = async () => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.get(
    "http://localhost:4567/userInfo",
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}


/** POST REQUESTS */

/*

 */

// posts a new workout
// data: information about the workout
export const createWorkout = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "http://localhost:4567/uploadWorkout",
    toSend,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

// posts a new workout
// data: information about the workout
export const createExercise = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "http://localhost:4567/uploadExercise",
    toSend,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

// creates a new user
// toSend: information about the user
export const createUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  let data = JSON.stringify(toSend);
  await axios.post(
    "http://localhost:4567/newUser",
    data,
    config
  )
  .then(response => {

    console.log(response.data)
    /*
    if(response.data){
      session.user= toSend.username
    }
    hard code it to work for only one indivudal; when logged
     in, it shows all the data for that on individual
     by modifying some "personal.js" or some component that
     uses hooks,useeffects,etc. and other variables
     */
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}


// logs in a user
// toSend: information about the user
export const loginUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "http://localhost:4567/login",
    toSend,
    config
  )
  .then(response => {
    console.log(response.data)
    return response.data;
    /*

     */
    // userSession.setSession(response.data)
  })
  .catch(function (error) {
    console.log(error.response.data);
  });
}

// follows a user
// data: information about the user and following
export const followUser = async (toSend) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
      "http://localhost:4567/follow",
      toSend,
      config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error.response.data);
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
    console.log(error.response.data);
  });
}

