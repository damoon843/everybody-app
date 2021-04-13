import React from 'react'; 
import Main from './components/Main/Main';
import UserProfile from './components/UserProfile/UserProfile';
import ExerciseModal from './components/ExerciseModal/ExerciseModal'
import WorkoutModal from './components/WorkoutModal/WorkoutModal'
import './HomePage.css';

function Home(props) {
  return (
    <div className="home">
      <div className="upload">
        <h5>Upload Activities</h5>
        <ExerciseModal user={props.user} id="exercise-modal"/>
        <WorkoutModal user={props.user} id="workout-modal"/>
      </div>
      <Main user={props.user} />
    </div>
  );
}

export default Home;
