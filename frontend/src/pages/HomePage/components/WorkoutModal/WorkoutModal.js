import React, { useState, useEffect } from 'react';
import {Modal, Tabs, Tab, Form, Col, Row, ToggleButtonGroup, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';
import axios from 'axios';
import './WorkoutModal.css';
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
      <button id="workout-modal-btn" className="submit-btn" onClick={handleShow}>
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
          <a href="/uploadWorkout"><button onClick={handleClose}>Create workout</button></a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default WorkoutModal
