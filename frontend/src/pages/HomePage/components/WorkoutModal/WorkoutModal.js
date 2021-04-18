import React, { useState, useRef, useEffect } from 'react';
import { Modal } from 'react-bootstrap';
import './WorkoutModal.css';
import axios from 'axios';
const AWS = require('aws-sdk');

function WorkoutModal(props){
  const [show, setShow] = useState(false);
  const inputFile = useRef();

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
    const media = document.getElementById('exercise-media').value;
    const filename = "google.com";
    let msg = document.getElementById("workout-form-msg");
    msg.innerText = "";

    // if ((exerciseList.length > 0) && title && desc && media && props.username) {
      const toSend = {
        exerciseList: exerciseList,
        mediaLink: filename,
        description: desc,
        username: props.username,
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
    // } else if (!props.username) { 
    //   msg.innerText = "Please ensure you are logged in.";
    // } else {
    //   console.log(exerciseList)
    //   console.log(title)
    //   console.log(desc)
    //   console.log(props.username)
    //   msg.innerText = "Please fill out all fields.";
    // }
  }

  const uploadFile = () => {
    // TODO: hide configs
    const BUCKET_NAME = "everybody-app-media";
    const ID = "AKIAVJ5YBZZRZONHA7PD";
    const SECRET = "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";
    let uploadedURL = "";

    const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET
    });

    const file = inputFile.current.files[0];
    const filename = inputFile.current.files[0].name

    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function(){
      // Read operation done, upload file content
      let fileContent = reader.result;

      // // Setting up S3 upload parameters
      const params = {
        Bucket: BUCKET_NAME,
        Key: filename,
        Body: fileContent,
        ACL: 'public-read',
      };

      // // Uploading files to the bucket
      s3.upload(params, function(err, data) {
        if (err) {
          throw err;
        }
        uploadedURL = data.Location;
        console.log(`File uploaded successfully. ${data.Location}`);
      });
    }
    return uploadedURL;
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
