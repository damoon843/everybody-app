import React, {useEffect, useState} from 'react';
import WorkoutItemHome from '../WorkoutItem/WorkoutItemHome';
import './Recommendations.css';
import axios from 'axios';
import {Spinner} from 'react-bootstrap'

let recData1 = []

function Recommendations(props) {
  const [recs, setRecs] = useState([]);
  const [loaded, setLoaded] = useState(false);

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
      const data = response.data.workouts
      const result = data.map(workout => <WorkoutItemHome changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>)
      recData1 = result;
      setRecs(recData1)
      setLoaded(true)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="home-main">
      <h3 id="recommendations">Recommended for you</h3>
      <div className="home-recs">
        { loaded ? recs : <Spinner animation="border" role="status" className="rec-loading">
  <span className="sr-only">Loading...</span>
</Spinner> }
      </div>
    </div>
  );
}

export default Recommendations;