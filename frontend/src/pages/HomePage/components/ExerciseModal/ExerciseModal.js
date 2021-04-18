import React, {useRef, useState} from 'react';
import {Modal} from 'react-bootstrap';
import './ExerciseModal.css';
import axios from 'axios';

/**
 * The modal to upload a new exercise.
 * 
 * @param {*} props used to get user information for submitting a new exercise.
 * @returns submits a new exercise.
 */
function ExerciseModal(props){
  // used to get the value of the input file
  const inputFile = useRef();

  // handles displaying/hiding the exercise modal
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  /**
   * Gets the value from a group of radio buttons.
   * 
   * @param {*} element the element with the group of radio buttons.
   * @returns the selected radio value
   */
  const getRadioVal = (element) => {
    const options = document.getElementsByName(element);
    let val = "";
    options.forEach(elt => {
      if (elt.checked) {
        val = elt.value;
      }
    })
    return val;
  }

  /**
   * Gets the values from a group of checkboxes.
   * 
   * @param {*} element 
   * @returns the selected checkbox values
   */
  const getCheckedVals = (element) => {
    let result = []
    let markedCheckbox = document.getElementsByName(element);  
    for (let checkbox of markedCheckbox) {  
      if (checkbox.checked) {
        result.push(checkbox.value)
      }
    }  
    return result;
  }

  /**
   * Gets the values entered into the exercise modal for submission.
   * 
   * @returns an object representing the values of the exercise.
   */
  const getExerciseVals = () => {
    const title = document.getElementById('exercise-title').value;
    const desc = document.getElementById('exercise-description').value;
    let duration = document.getElementById('exercise-duration').value;
    let type = getRadioVal('exercise-type-pref');
    let checkedVals = getCheckedVals('body-tags');
    checkedVals.push(type);
    let newDuration = duration * 60;
    const fileURL = "https://live.staticflickr.com/2006/32646057752_71fae65725_b.jpg";
    const toSend = {
      username: props.username,
      exerciseName: title,
      mediaLink: fileURL,
      duration: newDuration,
      tags: checkedVals,
      description: desc
    };
    return toSend;
  }

  /**
   * Submits the exercise to the backend.
   * 
   * @param {*} e the event upon which the exercise is submitted
   */
  const submitExercise = async (e) => {
    e.preventDefault();
    let msg = document.getElementById("exercise-form-msg")
    msg.innerText = ""
    const toSend = getExerciseVals();

    // check if all the values have been filled out
    if ((toSend.tags.length > 1) && toSend.exerciseName && toSend.duration && toSend.description && toSend.mediaLink && props.username) {
      let config = {
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        }
      }
      await axios.post(
        "http://localhost:4567/uploadExercise",
        toSend,
        config
      )
      .then(response => {
        if (response.status === 200) {
          msg.innerText = "Exercise submitted successfully!";
          setTimeout(function(){ 
            // update the list of exercises in the workout modal
            props.rerender(toSend.exerciseName);
            handleClose(); 
          }, 1000);
        }
      })
      .catch(function (error) {
        msg.innerText = "Error: could not submit exercise.";
        console.log(error);
      });
    } else if (!props.username) { // check if the user is logged in
      msg.innerText = "Please ensure you are logged in.";
    } else { // if the user hasn't filled out all the fields
      msg.innerText = "Please fill out all fields.";
    }
  }

  return (
    <div className="exercise-modal">
      <button id="exercise-modal-btn" className="submit-btn" onClick={handleShow}>
        Upload Exercise
      </button>
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title className="modal-title">Upload Exercise</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form action="/uploadExercise" className="exercise-form">
            <label className="exercise-form-label"><h5>Title</h5><input id="exercise-title" type="text" placeholder="Enter exercise title" required/></label>
            
            <label className="exercise-form-label"><h5>Description</h5><textarea id="exercise-description" rows={3} type="text" placeholder="Enter a description of your exercise" required/></label>
            
            <label className="exercise-form-label"><h5>Duration (number of minutes)</h5><input min="0" id="exercise-duration" type="number" placeholder="Enter exercise duration" required/></label>

            <label className="exercise-form-label"><h5>Upload media</h5><input type="file" id="exercise-media" name="exercise-media" ref={inputFile} required/></label>

            <div className="exercise-form-row">
              <div className="exercise-row-item">
                <h5>Exercise Type</h5>
                <div className="exercise-radio-row">
                  
                  <label className="exercise-radio-label"><input className="input-spacer" type="radio" id="cardio-exercise" name="exercise-type-pref" value="cardio" required defaultChecked/>Cardio</label>
                  <label className="exercise-radio-label"><input className="input-spacer" type="radio" id="bodyweight-exercise" name="exercise-type-pref" value="bodyweight"/>Bodyweight</label>
                </div>
              </div>

              <div className="exercise-row-item">
                <h5>Body Area Tags</h5>
                <div className="exercise-check-row">
                  
                  <label className="check-label"><input className="input-spacer" type="checkbox" id="arms" name="body-tags" value="arms" required/>Arms</label>
                  <label className="check-label"><input className="input-spacer" type="checkbox" id="legs" name="body-tags" value="legs"/>Legs</label>
                  <label className="check-label"><input className="input-spacer" type="checkbox" id="chest" name="body-tags" value="chest"/>Chest</label>
                  <label className="check-label"><input className="input-spacer" type="checkbox" id="abs" name="body-tags" value="abs"/>Abs</label>
                </div>
              </div>
            </div>
            
            </form>
        </Modal.Body>
        <Modal.Footer>
          <p id="exercise-form-msg"></p>
          <button className="close-btn" onClick={handleClose}>
            Close
          </button>
          <button className="submit-btn" onClick={submitExercise}>
            Upload Exercise
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ExerciseModal
