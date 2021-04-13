import React, { useState, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import axios from 'axios';
import './WorkoutModal.css';
import { createWorkout } from '../../../../api';
import ExerciseItem from './ExerciseItem';

function WorkoutModal(props){
  const [show, setShow] = useState(false);
  const [exercises, setExercises] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    getAllExercises()
  }, []);

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

  const getAllExercises = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    await axios.get(
      "http://localhost:4567/publicExercises",
      config
    )
    .then(response => {
      const data = Object.values(response.data)
      const keys = Object.keys(response.data)
      let result = [];
      for (let i = 0; i < keys.length; i++) {
        // const item = <ExerciseItem key={keys[i]} data={data[i]}/>
        const opt = <option value={keys[i]}>{data[i][6]}</option>
        result.push(opt)
      }
      setExercises(result)
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
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

            {/* <Select
              isMulti
              name="colors"
              options={sampleData}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChange}
            /> */}
            <p id="form-msg"></p>
          </form>
          <select name="exercises" id="select-exercises" multiple>
            {exercises}
          </select>
          {/* <div>{exercises}</div> */}
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
