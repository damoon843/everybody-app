import React, {useState, useRef, useEffect} from 'react';
import GridItem from '../GridItem/GridItem';
import './Main.css';

function Main() {
  let workouts = [{title: "Workout 1", duration: "15 min", user: "Tim Nelson"}, {title: "Workout 2", duration: "30 min", user: "Spike"}, 
  {title: "Workout 3", duration: "20 min", user: "Andy Van Dam"}];

  useEffect(() => {
    getWorkouts();
  });

  // TODO: fill this out with a GET request
  const getWorkouts = () => {
  }

  const renderWorkouts = () => {
    const anchor = document.getElementById('grid-anchor')
    if (workouts) {
      workouts.forEach(workout => {
        <GridItem workout={this.workout} />
      });
    }
  }

  return (
    <div className="home-main">
      <div className="grid-anchor"></div>
    </div>
  );
}

export default Main;