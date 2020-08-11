import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Alert from '../Layout/Alert';
import { setAlert } from '../../actions/alerts';
import { register } from '../../actions/auth';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password;s doesn't match", 'danger');
    } else {
      register({ name, email, password });
    }
  };
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <section onSubmit={onSubmit} className='container'>
      <Alert />
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form'>
        <div className='form-group'>
          <input
            onChange={onChange}
            name='name'
            value={name}
            type='text'
            placeholder='Name'
          />
        </div>
        <div className='form-group'>
          <input
            onChange={onChange}
            name='email'
            value={email}
            type='email'
            placeholder='Email Address'
          />
          <small className='form-text'>
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
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
        <div className='form-group'>
          <input
            onChange={onChange}
            name='password2'
            value={password2}
            type='password'
            placeholder='Confirm Password'
            minLength='6'
          />
        </div>
        <input type='submit' value='Register' className='btn btn-primary' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to='/login'>Sign In</Link>
      </p>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};
Register.propTypes = {
  setAlert: PropTypes.func,
  isAuthenticated: PropTypes.bool,
};
export default connect(mapStateToProps, { setAlert, register })(Register);
