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
    return selected;
  }

  const submitWorkout = async (e) => {
    e.preventDefault();
    const title = document.getElementById('workout-title').value;
    const desc = document.getElementById('workout-description').value;
    const exerciseList = getSelected('select-exercises');

    let msg = document.getElementById("workout-form-msg")
    msg.innerText = ""

    if ((exerciseList.length > 0) && title && desc && props.username.current) {
      const toSend = {
        exerciseList: exerciseList,
        mediaLink: "google.com",
        description: desc,
        username: props.username.current,
        workoutName: title,
      };
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
        if (response.status == 200) {
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
    } else {
      console.log(exerciseList)
      console.log(title)
      console.log(desc)
      console.log(props.username.current)
      msg.innerText = "Please fill out all fields.";
    }
  }

  // const createWorkout = async (toSend) => {
  //   let config = {
  //     headers: {
  //       "Content-Type": "application/json",
  //       'Access-Control-Allow-Origin': '*',
  //     }
  //   }
  //   await axios.post(
  //     "http://localhost:4567/uploadWorkout",
  //     toSend,
  //     config
  //   )
  //   .then(response => {
  //     if (response.status == 200) {
  //       msg.innerText = "Workout submitted successfully!";
  //       setTimeout(function(){ handleClose(); }, 1000);
  //     }
  //   })
  //   .catch(function (error) {
  //     msg.innerText = "Error: could not submit workout.";
  //     console.log(error);
  //   });
  // }

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
            <label className="workout-form-label"><h5>Select Exercises (cmd/ctrl + click)</h5><select name="exercises" id="select-exercises" multiple>
            {props.exercises}
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
