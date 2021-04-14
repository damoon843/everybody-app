import React from 'react'; 
import './Workout.css';
import { followUser } from '../../../../api';

function Workout(props){
  const url = "/workout/" + props.id

  const follow = () => {
    const toSend = {
      // TODO: remove hard coding
      user: "ntim",
      following: "aguo"
    };
    console.log(toSend)
    followUser(toSend).then(result => {
      console.log("user followed!")
    })
  }

  return(
    <div className="workout-container">
      <img alt="workout thumbnail" className="workout-image" src={props.thumbnail}/>
      <div className="workout-text">
        <h5>{props.title}<span className="workout-info"> ({props.duration})</span></h5>
        <div className="workout-row">
          <p className="workout-info">{props.postUser}</p>
          <button className="submit-btn" id="follow-btn" onClick={follow}>Follow</button>
        </div>
      </div>
      <a href={url}><button className="workout-btn">Start workout</button></a>
    </div>
  );
}
export default Workout