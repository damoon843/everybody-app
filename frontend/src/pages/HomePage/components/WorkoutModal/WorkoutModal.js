import React, { useState, useEffect } from 'react';
import {Modal, Tabs, Tab, form, Col, Row, ToggleButtonGroup, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import './WorkoutModal.css';
import Select from 'react-select';
import { createWorkout } from '../../../../api';

const sampleData = [{label: "exercise 1", duration: "00:15:00", value: 1}, {label: "exercise 2", duration: "00:20:00", value: 2}, {label: "exercise 3", duration: "00:10:00", value: 3}]

const dummy = [{

}];

function WorkoutModal(props){
  const [show, setShow] = useState(false);
  const [exercises, setExercises] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // converts exercises into readable format for selecting (title -> label, id -> value)
  const convertData = (data) => {
    let result = [];
    data.forEach(exercise => {
      let newObj = { label: exercise.title, value: exercise.id, duration: exercise.duration }
      result.push(newObj)
    })
    return result;
  }

  // TODO: make this async
  // const renderExercises = () => {
  //   setExercises(sampleData.map((exercise) => <WorkoutItem title={exercise.title} duration={exercise.duration} />));
  // }

  const handleChange = (selected) => {
    setExercises(selected)
  }

  const submitWorkout = (e) => {
    e.preventDefault();
    const title = document.getElementById('workout-title').value;
    const desc = document.getElementById('workout-description').value;
    // let duration = document.getElementById('exercise-duration').value;
    // let newDuration = duration * 60;
    let exerciseList = [{username: "chrissy", exerciseName: 'exercise1'}, {username: "chrissy", exerciseName: 'exercise2'}, {username: "chrissy", exerciseName: 'exercise3'}];
    const toSend = {
      exerciseList: exerciseList,
      duration : 60,
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

  useEffect(() => {
    // renderExercises();
  }, []);

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
            <label>Title</label>
            <input id="workout-title" type="text" placeholder="Enter workout title" />
            <label>Description</label>
            <input id="workout-description" as="textarea" rows={3} type="text" placeholder="Enter a description of your workout" />
            <label>Select Exercises</label>

            <Select
              isMulti
              name="colors"
              options={sampleData}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
            />
            <p id="form-msg"></p>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={submitWorkout}>Create workout</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default WorkoutModal
