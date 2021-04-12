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
    title: data.title,
    description: data.description,
    exercises: data.tags,
    media: data.media
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