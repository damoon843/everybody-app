import React, {useEffect, useState} from 'react';
// import { getRecommendations } from '../../../../api';
import WorkoutItem from '../WorkoutItem/WorkoutItem';
import './Recommendations.css';
import axios from 'axios';

function Recommendations(props) {
  const [recs, setRecs] = useState([]);

  useEffect(() => {
    getRecommendations();
  }, []);

  const getRecommendations = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    const toSend = {
      username: props.username.current
    };
    await axios.post(
      "http://localhost:4567/getRecommendations",
      toSend,
      config,
    )
    .then(response => {
      console.log(response)
      const data = response.data.workouts
      console.log(data)
      const result = data.map(workout => <WorkoutItem key={workout.workout_id} id={workout.workout_id} name={workout.workout_name} createdAt={workout.created_at} description={workout.description} duration={workout.duration} postingUser={workout.posting_user} likeCount={workout.like_count} mediaLink={workout.media_link} username={props.username} following={workout.following}/>)
      console.log(result)
      setRecs(result)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="home-main">
      <h3 id="recommendations">Recommended for you</h3>
      <div className="home-recs">
        { recs }
      </div>
    </div>
  );
}

export default Recommendations;