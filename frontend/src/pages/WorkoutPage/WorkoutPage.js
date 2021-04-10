import React, {useState, useEffect} from 'react'; 
import WorkoutItem from './components/WorkoutItem/WorkoutItem';
import './WorkoutPage.css';
import { getWorkout } from '../../api';

// fix this so that it shows workout title at top
// and then individual exercises in iframe

// replace all instances of [sampleWorkout] with [workout] state variable
const sampleWorkout = {
  title: "workout 1",
  description: "this is a workout description.",
  user: "tim nelson",
  avatar: "https://cs.brown.edu/~tbn/timbw.png",
  exercises: [
    { title: "exercise 1", username: "tom doeppner", avatar: "https://cs.brown.edu/media/filer_public_thumbnails/filer_public/2014/10/08/twd.jpg__120x180_q85_crop_subject_location-1563%2C2501_subsampling-2_upscale.jpg", description: "this is the description for an exercise.", duration: "00:05:00" },
    { title: "exercise 2", username: "kathi fisler", avatar: "https://cs.brown.edu/~kfisler/Images/kathi-lab.jpg", description: "this is the description for an exercise.", duration: "00:03:00"  },
    { title: "exercise 3", username: "tom doeppner", avatar: "https://cs.brown.edu/media/filer_public_thumbnails/filer_public/2014/10/08/twd.jpg__120x180_q85_crop_subject_location-1563%2C2501_subsampling-2_upscale.jpg", description: "this is the description for an exercise.", duration: "00:02:00"  },
    { title: "exercise 4", username: "tom doeppner", avatar: "https://cs.brown.edu/media/filer_public_thumbnails/filer_public/2014/10/08/twd.jpg__120x180_q85_crop_subject_location-1563%2C2501_subsampling-2_upscale.jpg", description: "this is the description for an exercise.", duration: "00:05:00"  },
    { title: "exercise 5", username: "jeff huang", avatar: "https://vivo.brown.edu/profile-images/532/017/d77/d4d/4d5/994/fb0/a57/2ba/5e9/16/jeffh_photo_.jpg", description: "this is the description for an exercise.", duration: "00:08:00"  },
    { title: "exercise 6", username: "david laidlaw", avatar: "https://0.academia-photos.com/9364/3233/3204/s200_david_h..laidlaw.jpg", description: "this is the description for an exercise.", duration: "00:05:00"  },
    { title: "exercise 7", username: "kathi fisler", avatar: "https://cs.brown.edu/~kfisler/Images/kathi-lab.jpg", description: "this is the description for an exercise.", duration: "00:06:00"  },
    { title: "exercise 8", username: "tim nelson", avatar: "https://cs.brown.edu/~tbn/timbw.png", description: "this is the description for an exercise.", duration: "00:04:00"  },
  ]}

function WorkoutPage(props) {
  const [workout, setWorkout] = useState({});
  const [exercises, setExercises] = useState([]);
  const [currExercise, setCurrExercise] = useState();

  // render the workout's exercises in a listview
  const renderExercises = () => {
    setExercises(sampleWorkout.exercises.map((exercise) => <WorkoutItem title={exercise.title} duration={exercise.duration} username={exercise.username} avatar={exercise.avatar} description={exercise.description} />));
    setCurrExercise(exercises[0])
  }

  useEffect(() => {
    // setWorkout(getWorkout(props.id))
    renderExercises()
  }, []);

  
  
  return (
    <div className="workout-page">
      <div id="workout-info">
        <h1>{sampleWorkout.title}</h1>
        <div>
          <div className="workout-user">
            <div id="workout-user-info">
              <img src={sampleWorkout.avatar} id="workout-user-img" />
              <p>{sampleWorkout.user}</p>
            </div>
          </div>
          <p>{sampleWorkout.description}</p>
        </div>
        <div id="workout-page-left">
          <iframe id="workout-video" src="https://www.youtube.com/embed/5qap5aO4i9A" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen />
          <div id="exercise-text">
            <h3>{currExercise.props.title}</h3>
            <div className="exercise-user">
              <div id="exercise-user-info">
                <img src={sampleWorkout.avatar} id="workout-user-img" />
                <p>{currExercise.props.username}</p>
              </div>
            </div>
            <p>{currExercise.props.description}</p>
          </div>
        </div>
      </div>
      <div className="workout-page-section">
        <div id="workout-page-right">
          <h3>Exercises</h3>
          { exercises }
        </div>
      </div>
    </div>
  );
}
export default WorkoutPage
