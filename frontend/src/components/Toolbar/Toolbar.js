import React from 'react'; 
import {NavLink} from 'react-router-dom';
import {Navbar, Button, Form, FormControl, Nav} from "react-bootstrap";
import './Toolbar.css';
import ExerciseModal from '../ExerciseModal/ExerciseModal';
import LogoutButton from '../../pages/LoginPage/components/LogoutButton';

function Toolbar(props){
  return (
      <div>
          <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand href="/home">everyBODY</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact className="item" activeClassName="active-nav" to="/home">
                        Home
                    </NavLink>
                    <NavLink className="item" activeClassName="active-nav" to="/profile">
                        Profile
                    </NavLink>
                    <NavLink className="item" activeClassName="active-nav" to="/exercises">
                        Exercises
                    </NavLink>
                </Nav>
                <LogoutButton/>
              </Navbar.Collapse>
          </Navbar>
      </div>
  );
}
export default Toolbar