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
    "https://everybody-app.herokuapp.com/getRecommendations/" + username,
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
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
  await axios.get(
    "https://everybody-app.herokuapp.com/userWorkouts/" + username,
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
      "https://everybody-app.herokuapp.com/getWorkout/" + id,
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
  await axios.get(
    "https://everybody-app.herokuapp.com/publicExercises",
    config
  )
  .then(response => {
    return response.data;
  })
  .catch(function (error) {
    console.log(error);
  });
}


// gets specific user info
// username: the user's username
export const getUser = async (username) => {
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.get(
      "https://everybody-app.herokuapp.com/userInfo/" + username,
      config
  )
      .then(response => {
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
}

/** POST REQUESTS */

// posts a new workout
// data: information about the workout
export const createWorkout = async (data) => {
  const toSend = {
    exerciseList: data.exerciseList,//{"username": ?, "exerciseName": ?,
    duration : data.duration,
    mediaLink: data.mediaLink,
    description: data.description,
    username: data.username,
    workoutName: data.workoutName,
    exercises: data.exercises
  };
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "https://everybody-app.herokuapp.com/uploadWorkout",
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

// posts a new workout
// data: information about the workout
export const createExercise = async (data) => {
  const toSend = {
    username: data.username,
    exerciseName:data.exerciseName,
    mediaLink: data.mediaLink,
    duration: data.duration,
    tags: data.tags,
    description: data.description


  };
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
    "https://everybody-app.herokuapp.com/uploadExercise",
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

// follows a user
// data: information about the user and following
export const followUser = async (data) => {
  const toSend = {
    user: data.username,
    following: data.following


  };
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
      "https://everybody-app.herokuapp.com/follow",
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

// follows a user
// data: information about the user and following
export const unfollowUser = async (data) => {
  const toSend = {
    user: data.username,
    following: data.following


  };
  let config = {
    headers: {
      "Content-Type": "application/json",
      'Access-Control-Allow-Origin': '*',
    }
  }
  await axios.post(
      "https://everybody-app.herokuapp.com/unfollow",
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

