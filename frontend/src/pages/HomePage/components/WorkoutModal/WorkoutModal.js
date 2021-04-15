import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';
import './WorkoutModal.css';
// import { createWorkout } from '../../../../api';
import axios from 'axios';

function WorkoutModal(props){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const getSelected = (element) => {
    let selected = []
    for (let option of document.getElementById(element).options) {
      if (option.selected) {
        selected.push(option.value);
      }
    }
    console.log(selected)
    return selected;
  }

  const submitWorkout = (e) => {
    e.preventDefault();
    const title = document.getElementById('workout-title').value;
    const desc = document.getElementById('workout-description').value;
    const exerciseList = getSelected('select-exercises');
    const toSend = {
      exerciseList: exerciseList,
      mediaLink: "google.com",
      description: desc,
      username: props.user,
      workoutName: title,
    };
    console.log(toSend)
    createWorkout(toSend).then(result => {
      setShow(false);
    });
  }

  const createWorkout = async (toSend) => {
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
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  return (
    <div className="exercise-modal">
      <button id="workout-modal-btn" className="submit-btn" onClick={handleShow}>
        Create Workout
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/uploadWorkout" className="exercise-form">
            <label className="exercise-form-label">Title<input id="workout-title" type="text" placeholder="Enter workout title" /></label>
            
            <label className="exercise-form-label">Description<input id="workout-description" as="textarea" rows={3} type="text" placeholder="Enter a description of your workout" /></label>
            <label className="exercise-form-label">Select Exercises<select name="exercises" id="select-exercises" multiple>
            {props.exercises}
          </select></label>
            
            <p id="form-msg"></p>
          </form>

          
        </Modal.Body>
        <Modal.Footer>
          <button className="submit-btn" id="close-btn" onClick={handleClose}>
            Close
          </button>
          <button className="submit-btn" onClick={submitWorkout}>Create workout</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default WorkoutModal
