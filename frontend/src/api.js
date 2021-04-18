import axios from 'axios'

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