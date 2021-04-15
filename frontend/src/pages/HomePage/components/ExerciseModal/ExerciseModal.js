import React, { useState, useRef } from 'react';
import {Modal} from 'react-bootstrap';
// import { createExercise } from '../../../../api';
import './ExerciseModal.css';
// import S3 from "react-aws-s3";
import axios from 'axios';

function ExerciseModal(props){
  const [show, setShow] = useState(false);
  const inputFile = useRef();

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createExercise = async (toSend) => {
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
      return response.data;
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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

  const submitExercise = async (e) => {
    e.preventDefault();
    const title = document.getElementById('exercise-title').value;
    const desc = document.getElementById('exercise-description').value;
    let duration = document.getElementById('exercise-duration').value;
    let newDuration = duration * 60;
    let type = getRadioVal('exercise-type-pref');
    let checkedVals = getCheckedVals('body-tags');
    checkedVals.push(type);
    const media = document.getElementById('exercise-media').value;

    // let file = inputFile.current.files[0]
    // let filename = file.name

    // const config = {
    //   bucketName: "mybucket",
    //   region: "eu-west-1",
    //   accessKeyId: "key",
    //   secretAccessKey: "chinatown"
    // }

    // const s3Client = new S3(config);
    // s3Client.uploadFile(file, filename).then(data => {
    //   console.log(data)
    //   if (data.status === 204) {
    //     console.log("yay")
    //   } else {
    //     console.log("aw shucks")
    //   }
    // })

    const toSend = {
      username: props.user,
      exerciseName: title,
      mediaLink: media,
      duration: newDuration,
      tags: checkedVals,
      description: desc
    };
    console.log(toSend)

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
      console.log(response)
      setShow(false);
      console.log(props.render)
      props.rerender(title);
    })
    .catch(function (error) {
      console.log(error);
    });

    // createExercise(toSend).then(result => {
    //   setShow(false);
    //   console.log(props.render)
    //   props.rerender(title);
    //   // window.location.reload();
    // });
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
            <label className="exercise-form-label"><h5>Title</h5><input id="exercise-title" type="text" placeholder="Enter exercise title" /></label>
            
            <label className="exercise-form-label"><h5>Description</h5><textarea id="exercise-description" rows={3} type="text" placeholder="Enter a description of your exercise" /></label>
            
            <label className="exercise-form-label"><h5>Duration (number of minutes)</h5><input min="0" id="exercise-duration" type="number" placeholder="Enter exercise duration" /></label>

            <label className="exercise-form-label"><h5>Upload media</h5><input type="file" id="exercise-media" name="exercise-media" ref={inputFile} /></label>

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
