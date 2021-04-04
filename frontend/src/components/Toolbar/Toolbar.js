import React from 'react'; 
import Navbar from 'react-bootstrap/Navbar';
import {NavLink} from 'react-router-dom';
import {Button, Form, FormControl, Nav} from "react-bootstrap";
import './Toolbar.css';

function Toolbar(props){
  return (
      <div>
          <Navbar bg="dark" variant="dark" fixed="top">
              <Navbar.Brand href="/">everyBODY</Navbar.Brand>
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <NavLink exact className="item" activeClassName="active-nav" to="/">
                        Home
                    </NavLink>
                    <NavLink className="item" activeClassName="active-nav" to="/profile">
                        Profile
                    </NavLink>
                    <NavLink className="item" activeClassName="active-nav" to="/exercises">
                        Exercises
                    </NavLink>
                </Nav>
                <Form inline>
                    <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                    <Button variant="outline-info">Search</Button>
                </Form>
              </Navbar.Collapse>
          </Navbar>
      </div>
  );
}
export default Toolbar