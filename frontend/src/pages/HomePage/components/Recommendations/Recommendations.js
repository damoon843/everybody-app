import React, {useEffect, useState} from 'react';
import WorkoutItemHome from '../WorkoutItem/WorkoutItemHome';
import './Recommendations.css';
import axios from 'axios';
import {Spinner} from 'react-bootstrap'

// stores the list of recommendations
let recData = []

/**
 * Retrieves the recommendations through a post request that submits the username. The information of the workouts are then mapped into a workout item, which will be displayed on the home feed after a user logs in
 * @param {*} props the username of the user to display recommendations for
 * @returns the list of recommendations, rendered as WorkoutItemHome components.
 */
function Recommendations(props) {
  // state variable for representing the list of recommendations
  const [recs, setRecs] = useState([]);
  // state variable to indicate whether the list of recommendations is loaded or not
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    getRecommendations();
  }, []);

  /**
   * Gets the list of recommendations.
   */
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
      //creating workout items for all of the retrieved workout
      const result = data.map(workout => <WorkoutItemHome changeWorkout={props.changeWorkout} key={workout.workout_id} workout={workout} username={props.username}/>)
      recData = result;
      setRecs(recData)
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