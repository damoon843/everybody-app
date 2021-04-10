import React, { useState, useEffect } from 'react';
import {Modal, Tabs, Tab, Form, Col, Row, ToggleButtonGroup, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import './WorkoutModal.css';
import WorkoutItem from './components/WorkoutItem/WorkoutItem';
import Select from 'react-select';

const sampleData = [{label: "exercise 1", duration: "00:15:00", value: 1}, {label: "exercise 2", duration: "00:20:00", value: 2}, {label: "exercise 3", duration: "00:10:00", value: 3}]

function WorkoutModal(){
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

  // gets list of exercises (may not need this with async select)
  const getExercises = async () => {
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    await axios.get(
        "http://localhost:3000/postWorkout",
        config
    )
    .then(response => {
      // do something here
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  // posts a new workout
  const postWorkout = async () => {
    let formMsg = document.getElementById("form-msg");
    const toSend = {
      exercises: exercises
    };
    let config = {
      headers: {
        "Content-Type": "application/json",
        'Access-Control-Allow-Origin': '*',
      }
    }
    await axios.post(
      // fix this address/endpoint
      "http://localhost:3000/postWorkout",
      toSend,
      config
    )
    .then(response => {
      if (response.status === 200) {
        formMsg.innerText = "Workout created!";
        setTimeout(function(){ handleClose(); }, 2000);
      }
    })
    .catch(function (error) {
      formMsg.innerText = "Error: could not submit. Please try again.";
      console.log(error);
    });
  }

  // TODO: make this async
  // const renderExercises = () => {
  //   setExercises(sampleData.map((exercise) => <WorkoutItem title={exercise.title} duration={exercise.duration} />));
  // }

  const handleChange = (selected) => {
    setExercises(selected)
  }

  useEffect(() => {
    // renderExercises();
  }, []);

  return (
    <div className="exercise-modal">
      <button className="submit-btn" onClick={handleShow}>
        Create Workout
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Create Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="exercise-form">
            <Form.Group controlId="exerciseTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter workout title" />
            </Form.Group>

            <Form.Group controlId="exerciseDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} type="text" placeholder="Enter a description of your workout" />
            </Form.Group>

            <Form.Group controlId="exercises">
              <Form.Label>Select Exercises</Form.Label>
              <Select
                isMulti
                name="colors"
                options={sampleData}
                className="basic-multi-select"
                classNamePrefix="select"
                onChange={handleChange}
              />
            </Form.Group>
            <p id="form-msg"></p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <button onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default WorkoutModal
