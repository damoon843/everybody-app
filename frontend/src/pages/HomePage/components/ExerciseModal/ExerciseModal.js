import React, {useRef, useState} from 'react';
import {Modal} from 'react-bootstrap';
import './ExerciseModal.css';
import axios from 'axios';

const AWS = require('aws-sdk');

function ExerciseModal(props){
  const [show, setShow] = useState(false);
  const inputFile = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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

  const uploadFile = (callback) => {
    let uploadedURL = "";

    const BUCKET_NAME = "everybody-app-media";
    const ID = "AKIAVJ5YBZZRZONHA7PD";
    const SECRET = "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";

    const s3 = new AWS.S3({
      accessKeyId: ID,
      secretAccessKey: SECRET
    });

    const file = inputFile.current.files[0];
    const filename = inputFile.current.files[0].name

    let reader = new FileReader();
    // Read data from file
    reader.readAsDataURL(file);

    // NOTE: this func is called when reading from file finishes
    reader.onloadend = function() {
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
        callback(uploadedURL);
      });
    }
  }

  const getUploadedURL = function(url) {
    console.log(url)
    console.log("IN CALLBACK")
    return url;
  }

  const submitExercise = async (e) => {
    e.preventDefault();

    let msg = document.getElementById("exercise-form-msg")
    msg.innerText = ""

    const title = document.getElementById('exercise-title').value;
    const desc = document.getElementById('exercise-description').value;
    let duration = document.getElementById('exercise-duration').value;
    let type = getRadioVal('exercise-type-pref');
    let checkedVals = getCheckedVals('body-tags');
    checkedVals.push(type);
    let newDuration = duration * 60;
    const fileURL = "google.com";

    console.log(fileURL)

    // if (props.username && title && media && newDuration && (checkedVals.length > 1) && desc) {
      const toSend = {
        username: props.username,
        exerciseName: title,
        mediaLink: fileURL,
        duration: newDuration,
        tags: checkedVals,
        description: desc
      };
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
            props.rerender(title);
            handleClose(); 
          }, 1000);
        }
      })
      .catch(function (error) {
        msg.innerText = "Error: could not submit exercise.";
        console.log(error);
      });
    // } else if (!props.username) { 
    //   msg.innerText = "Please ensure you are logged in.";
    // } else {
    //   console.log(props.username)
    //   console.log(title)
    //   console.log(media)
    //   console.log(newDuration)
    //   console.log(checkedVals)
    //   console.log(desc)
    //   msg.innerText = "Please fill out all fields.";
    // }
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
          <button className="submit-btn" onClick={submitExercise}>Upload Exercise</button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default ExerciseModal
