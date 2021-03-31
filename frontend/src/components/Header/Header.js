import React from 'react'; 
//import './Header.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import {Button, Form, FormControl, Nav} from "react-bootstrap";

function Header(props){
  return (
      <div>

          <Navbar bg="dark" variant="dark">
              <Navbar.Brand href="#home">everyBODY</Navbar.Brand>
              <Nav className="mr-auto">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#profile">Profile</Nav.Link>
                  <Nav.Link href="#exercises">Exercises</Nav.Link>
              </Nav>
              <Form inline>
                  <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                  <Button variant="outline-info">Search</Button>
              </Form>
          </Navbar>
      </div>
  );
}
export default Header