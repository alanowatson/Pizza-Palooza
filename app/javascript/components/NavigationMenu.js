import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NavigationMenu = () => {
  return (
    <Navbar bg='light' variant='light'>
      <Nav className='me-auto'>
        <Nav.Item>
          <Nav.Link as={Link} to='/'>
            Home
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/menu'>
            Menu
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/create-pizza'>
            Create Pizza
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link as={Link} to='/manage-toppings'>
            Features
          </Nav.Link>
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default NavigationMenu;
