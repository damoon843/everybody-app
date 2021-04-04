import React, { useState } from 'react';
import {Modal} from 'react-bootstrap';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import './SubmitModal.css';

function SubmitModal(){
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="submit-modal">
      <button className="submit-btn" id="upload-btn" onClick={handleShow}>
        Upload
      </button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Tabs defaultActiveKey="tab1" id="uncontrolled-tab-example">
            <Tab eventKey="tab1" title="tab 1">
              <p>tab 1</p>
            </Tab>
            <Tab eventKey="tab2" title="tab 2">
              <p>tab 2</p>
            </Tab>
            <Tab eventKey="tab3" title="tab 3">
              <p>tab 3</p>
            </Tab>
          </Tabs>
        </Modal.Body>
        <Modal.Footer>
          <button variant="secondary" onClick={handleClose}>
            Close
          </button>
          <button variant="primary" onClick={handleClose}>
            Save Changes
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
export default SubmitModal
