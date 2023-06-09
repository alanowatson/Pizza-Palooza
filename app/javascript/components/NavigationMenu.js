import React from 'react';
import { Link } from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import LoginForm from './LoginForm';

const NavigationMenu = ({ isLoggedIn, setIsLoggedIn }) => {
  return (
    <>
      <Navbar bg='light' variant='light'>
        <Nav className='me-auto'>
          <Nav.Item>
            <Nav.Link as={Link} to='/'>
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to='/manage-pizzas'>
              Manage Pizza Menu
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            {isLoggedIn && (
              <Nav.Link as={Link} to='/manage-toppings'>
                Manage Toppings
              </Nav.Link>
            )}
          </Nav.Item>
          <Nav.Item>
            {isLoggedIn && (
              <button onClick={() => setIsLoggedIn(false)}> Logout </button>
            )}
          </Nav.Item>
        </Nav>
        <>
          {isLoggedIn ? (
            <h1>Hello Owner!</h1>
          ) : (
            <LoginForm onLogin={setIsLoggedIn} />
          )}
        </>
      </Navbar>
    </>
  );
};

export default NavigationMenu;
