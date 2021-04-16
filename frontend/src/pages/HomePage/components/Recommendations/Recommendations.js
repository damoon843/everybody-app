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
      username: props.username
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
      const result = data.map(workout => <WorkoutItem key={workout.workout_id} workout={workout} username={props.username}/>)
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