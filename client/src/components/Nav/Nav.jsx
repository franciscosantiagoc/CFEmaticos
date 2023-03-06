<<<<<<< HEAD
import React from 'react';
=======
import React, {useEffect, useState} from 'react';
>>>>>>> develop
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useNavigate, useLocation } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Nav.scss';
import logocfe from './../../assets/img/logo.jpg';  

export default function NavComponent() {
  let navigate = useNavigate();
  let location = useLocation();
  let itemStorage = localStorage.getItem('user');
  const [user, setUser] = useState(null)

  const logout = () => {
    localStorage.removeItem('user');
  }
  useEffect(() => {
    if(itemStorage !=null) {
      setUser(JSON.parse(localStorage.getItem('user')));
    }/* else {
      window.location = '/login';
    } */
  },[])
  
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
            {user && (<>
            <NavDropdown title="CFEmáticos" id="basic-nav-dropdown">
              <NavDropdown.Item href="/orders">Listar</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                navigate('/orders/new')
              }}>Registrar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Ordenes manten..." id="basic-nav-dropdown">
              <NavDropdown.Item href="">Listar</NavDropdown.Item>
              <NavDropdown.Item href="">Registrar</NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Centros de atención" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={()=>{
                  if(window.location != '/centros/lista')
                    navigate('/centros/lista')
              }}>Listar</NavDropdown.Item>
              <NavDropdown.Item onClick={()=>{
                if(window.location != '/centros/lista?nuevo=true')
                  navigate('/centros/lista?nuevo=true');
              }}>Registrar</NavDropdown.Item>
            </NavDropdown></>)}
            {!user &&(<Nav.Link onClick={()=>{
              navigate('/login')
            }}>Login</Nav.Link>)}
            {user && (<Nav.Link onClick={()=>{
              logout();
              alert('sesión cerrada')
            }}>Cerrar sesión </Nav.Link>)}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
