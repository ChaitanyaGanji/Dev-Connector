import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import PropTypes from 'prop-types';

const Navbar = ({ auth, logout }) => {
  const { isAuthenticated, loading } = auth;

  const accessLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <i className='fa fa-user'></i>{' '}
        <Link to='/dashboard'>
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a href='#!' onClick={logout}>
          <i className='fa fa-sign-out alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );
  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Developers</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );
  return (
    <nav className='navbar bg-dark'>
      <h1>
        <Link to='/'>
          <i className='fas fa-code'></i>
          Dev Connect
        </Link>
      </h1>
      {!loading && isAuthenticated ? accessLinks : guestLinks}
    </nav>
  );
};
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

Navbar.prototypes = {
  auth: PropTypes.object,
  logout: PropTypes.func,
};

export default connect(mapStateToProps, { logout })(Navbar);
