import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addExperience } from '../../actions/profile';
import Alert from '../Layout/Alert';

const AddExperience = ({ addExperience, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    title: '',
    location: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const { company, title, location, from, to, current, description } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addExperience(formData, history);
  };
  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Add An Experience</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i>
        Add any developer/programming positions that you have had in the past
      </p>
      <small>*= required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={title}
            onChange={onChange}
            placeholder='* Job Title'
            name='title'
          />
        </div>
        <div className='form-group'>
          <input
            value={company}
            onChange={onChange}
            type='text'
            placeholder='* Company'
            name='company'
          />
        </div>
        <div className='form-group'>
          <input
            value={location}
            onChange={onChange}
            type='text'
            placeholder='* Location'
            name='location'
          />
        </div>
        <div className='form-group'>
          <h4>From Date</h4>
          <input value={from} onChange={onChange} type='date' name='from' />
        </div>
        <div className='form-group'>
          <h4>To Date</h4>
          <input
            value={to}
            onChange={onChange}
            type='date'
            disabled={toDateDisabled ? 'disabled' : ''}
            name='to'
          />
        </div>
        <div className='form-group'>
          <p>
            <input
              type='checkbox'
              name='curremt'
              checked={current}
              value={current}
              onChange={(e) => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{' '}
            Current Job
          </p>
        </div>
        <div className='form-group'>
          <textarea
            name='description'
            cols='30'
            rows='5'
            placeholder='Job Desription'
            value={description}
            onChange={onChange}
          ></textarea>
        </div>
        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn my-1'>
          Go Back
        </Link>
      </form>
    </section>
  );
};

AddExperience.propTypes = {
  addExperience: PropTypes.func.isRequired,
};

export default connect(null, { addExperience })(withRouter(AddExperience));
