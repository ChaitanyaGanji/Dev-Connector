import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import PropTypes from 'prop-types';
import Alert from '../Layout/Alert';

const Login = ({ isAuthenticated, login }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login({ email, password });
  };

  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section onSubmit={onSubmit} className='container'>
      <Alert />
      <h1 className='large text-primary'>Sign In</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Sign In to Your Account
      </p>
      <form className='form'>
        <div className='form-group'>
          <input
            onChange={onChange}
            name='email'
            value={email}
            type='email'
            placeholder='Email Address'
          />
        </div>
        <div className='form-group'>
          <input
            onChange={onChange}
            name='password'
            value={password}
            type='password'
            placeholder='Password'
            minLength='6'
          />
        </div>
        <input type='submit' value='Login' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

Login.prototypes = {
  login: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { login })(Login);
