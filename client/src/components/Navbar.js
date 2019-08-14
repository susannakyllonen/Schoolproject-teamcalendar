import React, { Component, Fragment } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../actions/login';
import store from '../store';

const NavBar = ({ loginReducer }) => {
  const loginLink = (
    <Link to='/login'>
      <i class='fas fa-sign-in-alt' />
    </Link>
  );

  const submitLogout = () => {
    logout();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  };

  const logoutLink = (
    <a onClick={submitLogout} href='#!'>
      <i className='fas fa-sign-out-alt' />
    </a>
  );

  return (
    <Fragment>
      <Navbar bg='dark' variant='dark' className='fadednavbar'>
        <Navbar.Brand>PIP</Navbar.Brand>
        <Nav className='mr-auto' />
        <Nav>
          <Nav.Link>
            {!loginReducer.isLoading &&
              (loginReducer.isLogin ? logoutLink : loginLink)}
          </Nav.Link>
        </Nav>
      </Navbar>
    </Fragment>
  );
};

const mapStateToProps = state => {
  return {
    loginReducer: state.loginReducer
  };
};

export default connect(
  mapStateToProps,
  { logout }
)(NavBar);
