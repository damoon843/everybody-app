import React, { useState, useEffect } from 'react';
import {Modal, Tabs, Tab, Form, Col, Row, ToggleButtonGroup, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';
import './WorkoutModal.css';
import WorkoutItem from './components/WorkoutItem/WorkoutItem'

const sampleData = [{title: "exercise 1", duration: "00:15:00"}, {title: "exercise 2", duration: "00:20:00"}, {title: "exercise 3", duration: "00:10:00"}]

function WorkoutModal(){
  const [show, setShow] = useState(false);
  const [allExercises, setAllExercises] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // TODO: make this async
  const renderAllExercises = () => {
    setAllExercises(sampleData.map((exercise) => <WorkoutItem title={exercise.title} duration={exercise.duration} />));
  }

  useEffect(() => {
    renderAllExercises();
  }, []);

  return (
    <div className="exercise-modal">
      <button className="submit-btn" onClick={handleShow}>
        Create Workout
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Workout</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form className="exercise-form">
            <Form.Group controlId="exerciseTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Enter exercise title" />
            </Form.Group>

            <Form.Group controlId="exerciseDesc">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={3} type="text" placeholder="Enter a description of your exercise" />
            </Form.Group>

            <Form.Group controlId="exercises">
              <Form.Label>Select Exercises</Form.Label>
              <div>
                {allExercises}
              </div>
            </Form.Group>
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
