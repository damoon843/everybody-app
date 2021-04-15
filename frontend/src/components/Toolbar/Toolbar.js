import React, {useState} from 'react'; 
import {NavLink, withRouter} from 'react-router-dom';
import {Navbar, Nav, Modal, Button} from "react-bootstrap";
import './Toolbar.css';
import axios from 'axios';

function Toolbar(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = async () => {
        let msg = document.getElementById('logout-msg')
        msg.innerText = ""
        let config = {
            headers: {
                "Content-Type": "application/json",
                'Access-Control-Allow-Origin': '*',
            }
        }
        await axios.post(
            "http://localhost:4567/logout",
            config
        )
        .then(response => {
            if (response.data.isValid) {
                props.history.push('/login');
            }
            console.log(response.data)
        })
        .catch(function (error) {
            msg.innerText = "Could not log out. Please try again."
            console.log(error);
        });
    }

    return (
        <div>
            <Navbar bg="dark" variant="dark" fixed="top">
                <Navbar.Brand href="/home">everyBODY</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="ml-auto" id="toolbar">
                        <NavLink exact className="item" activeClassName="active-nav" to="/home">
                            Home
                        </NavLink>
                        <NavLink className="item" activeClassName="active-nav" to="/profile">
                            Profile
                        </NavLink>
                        <NavLink className="item" activeClassName="active-nav" to="/exercises">
                            Exercises
                        </NavLink>
                        <button className="submit-btn" id="logout-btn" onClick={handleShow}>
                            Log out
                        </button>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm action</Modal.Title>
                </Modal.Header>
                <Modal.Body className="modal-body-logout">Are you sure you want to log out?</Modal.Body>
                <Modal.Footer className="modal-footer-btns">
                <p id="logout-msg"></p>
                <div className="modal-buttons">
                    <button className="close-btn" onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="submit-btn logout-btn" onClick={logout}>
                        Yes, log out
                    </button>
                </div>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default withRouter(Toolbar);