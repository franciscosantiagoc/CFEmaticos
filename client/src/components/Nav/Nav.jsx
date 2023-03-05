import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.scss';
import logocfe from './../../assets/img/logo.jpg';  

export default function NavComponent() {
  let navigate = useNavigate();
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/">
            <img src={logocfe} alt="Logo cfematicos"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link onClick={()=>{navigate('/')}}>Inicio</Nav.Link>
            <NavDropdown title="CFEmáticos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders">Listar</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{navigate('/orders/new')}}>Registrar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ordenes manten..." id="basic-nav-dropdown">
              <NavDropdown.Item href="">Listar</NavDropdown.Item>
              <NavDropdown.Item href="">Registrar</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link onClick={()=>{navigate('/login')}}>Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
