import React, {useState} from 'react'; 
import {NavLink, withRouter} from 'react-router-dom';
import {Navbar, Nav, Modal, Button} from "react-bootstrap";
import './Toolbar.css';

function Toolbar(props){
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const logout = () => {
        console.log("logout")
        props.changeUsername("")
        props.history.push('/');
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
                <Modal.Footer>
                <button className="close-btn" onClick={handleClose}>
                    Cancel
                </button>
                <button className="submit-btn" onClick={logout}>
                    Yes, log out
                </button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}
export default withRouter(Toolbar);