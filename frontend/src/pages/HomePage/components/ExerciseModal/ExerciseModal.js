import React, { useState } from 'react';
import {Modal, Tabs, Tab, Form, Col, Row, ToggleButtonGroup, ToggleButton, ButtonGroup, Button} from 'react-bootstrap';
import './ExerciseModal.css';

function ExerciseModal(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="exercise-modal">
      <button className="submit-btn" onClick={handleShow}>
        Upload Exercise
      </button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Upload Exercise</Modal.Title>
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

            <Form.Label>Tags</Form.Label>
              <Form.Group as={Row} controlId="exerciseTags">
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Cardio"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Bodyweight"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Another Label"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
                <Col>
                  <Form.Check
                    type="checkbox"
                    label="Legs"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios1"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Arms"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios2"
                  />
                  <Form.Check
                    type="checkbox"
                    label="Abs"
                    name="formHorizontalRadios"
                    id="formHorizontalRadios3"
                  />
                </Col>
              </Form.Group>

              <Form.Group>
                <Form.File id="exerciseMedia" label="Upload exercise video" />
              </Form.Group>
            </Form>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={handleClose}>
            Close
          </button>
          <a href="/uploadExercise"><button onClick={handleClose}>Upload Exercise</button></a>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ExerciseModal
