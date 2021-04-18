import React, { useState, useRef } from 'react';
import { Modal } from 'react-bootstrap';
import './WorkoutModal.css';
import axios from 'axios';
import { getSelected } from '../../../../calculations';

/**
 * The modal to upload a new workout.
 * 
 * @param {*} props used to get user information for submitting a new workout.
 * @returns submits a new workout.
 */
function WorkoutModal(props){
  // used to get the value of the input file
  const inputFile = useRef();

  // handles displaying/hiding the workout modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Gets all the values of the workout to send to the backend.
   * 
   * @returns an object representing the workouts values
   */
  const getWorkoutVals = () => {
    const title = document.getElementById('workout-title').value;
    const desc = document.getElementById('workout-description').value;
    const exerciseList = getSelected('select-exercises');
    const media = "https://live.staticflickr.com/2006/32646057752_71fae65725_b.jpg";
    const toSend = {
      exerciseList: exerciseList,
      mediaLink: media,
      description: desc,
      username: props.username,
      workoutName: title,
    };
    return toSend;
  }

  /**
   * Submits a workout.
   * 
   * @param {*} e the event on which we submit a workout
   */
  const submitWorkout = async (e) => {
    e.preventDefault();
    const toSend = getWorkoutVals();
    let msg = document.getElementById("workout-form-msg");
    msg.innerText = "";

    // make sure all the fields are filled out
    if ((toSend.exerciseList.length > 0) && toSend.workoutName && toSend.description && toSend.mediaLink && props.username) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      await axios.post(
        "http://localhost:4567/uploadWorkout",
        toSend,
        config
      )
      .then(response => {
        if (response.status === 200) {
          msg.innerText = "Workout submitted successfully!";
          setTimeout(function(){ 
            handleClose();
          }, 1000);
        }
      })
      .catch(function (error) {
        msg.innerText = "Error: could not submit workout.";
        console.log(error);
      });
    } else if (!props.username) {  // if the user is not logged in
      msg.innerText = "Please ensure you are logged in.";
    } else { // if not all the fields are filled out
      msg.innerText = "Please fill out all fields.";
    }
  }

  return (
    <div className="exercise-modal">
      <button id="workout-modal-btn" className="submit-btn" onClick={handleShow}>
        Create Workout
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Create Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/uploadWorkout" className="workout-form">
            <label className="workout-form-label"><h5>Title</h5><input id="workout-title" type="text" placeholder="Enter workout title" /></label>
            <label className="workout-form-label"><h5>Description</h5><textarea id="workout-description" rows={3} type="text" placeholder="Enter a description of your workout" /></label>
            <label className="workout-form-label"><h5>Upload media</h5><input type="file" id="workout-media" name="workout-media" ref={inputFile} required/></label>
            <label className="workout-form-label"><h5>Select Exercises (cmd/ctrl + click)</h5><select name="exercises" id="select-exercises" multiple>
            {props.exercises.current}
          </select></label>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <p id="workout-form-msg"></p>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
          <button className="submit-btn" onClick={submitWorkout}>Create workout</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default WorkoutModal
