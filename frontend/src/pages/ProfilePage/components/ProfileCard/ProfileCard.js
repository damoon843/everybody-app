import React, {useEffect, useRef, useState} from 'react';
import {Modal} from 'react-bootstrap';
import './ProfileCard.css';
import axios from 'axios';
import { withRouter } from 'react-router';

function ProfileCard(props) {
  const [show, setShow] = useState(false);
  // const [pref, setPref] = useState("");

  useEffect(() => {
    // convertPrefs();
    props.rerender("hi")
  }, []);

  const convertPrefs = (time) => {
      if (time === 0) {
        // props.changeUserData("0-30 minutes");
          // setPref("0-30 minutes");
          return "0-30 minutes"
      } else if (time === 1) {
        // props.changeUserData("30-60 minutes");
          // setPref("30-60 minutes");
          return "30-60 minutes"
      } else if (time === 2) {
        // props.changeUserData("60+ minutes");
          // setPref("60+ minutes");
          return "60+ minutes"
      }
  }

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteAccount = async () => {
    let msg = document.getElementById('delete-msg')
    msg.innerText = ""
    let config = {
        headers: {
            "Content-Type": "application/json",
            'Access-Control-Allow-Origin': '*',
        }
    }
    await axios.post(
        "http://localhost:4567/deleteUser",
        config
    )
    .then(response => {
        if (response.data.success) {
            props.history.push('/');
        }
        console.log(response.data)
    })
    .catch(function (error) {
        msg.innerText = "Error: could not delete account."
        console.log(error);
    });
  }

  return (
    <div className="profile-card">
      <div className="profile-card-text">
        <h1>{props.userData.firstName} {props.userData.lastName}</h1>
        <p>Preferred duration: {convertPrefs(props.userData.workoutDuration)}<br></br>Preferred workout type: {props.userData.workoutType}</p>
      </div>
      <button className="delete-account" id="delete-btn" onClick={handleShow}>Delete Account</button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
            <Modal.Title>Confirm action</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-delete">Are you sure you want to delete your account? This cannot be undone.</Modal.Body>
        <Modal.Footer className="modal-footer-btns">
        <p id="delete-msg"></p>
        <div className="modal-buttons">
          <button className="close-btn" onClick={handleClose}>
              Cancel
          </button>
          <button className="delete-account" onClick={deleteAccount}>
              Yes, delete
          </button>
        </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default withRouter(ProfileCard);