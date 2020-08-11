import React, { useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEducation } from '../../actions/profile';
import Alert from '../Layout/Alert';

const AddEducation = ({ addEducation, history }) => {
  const [formData, setFormData] = useState({
    school: '',
    degree: '',
    fieldofstudy: '',
    from: '',
    to: '',
    current: false,
    description: '',
  });
  const [toDateDisabled, toggleDisabled] = useState(false);
  const {
    school,
    degree,
    fieldofstudy,
    from,
    to,
    current,
    description,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    addEducation(formData, history);
  };
  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Add An Education</h1>
      <p className='lead'>
        <i className='fas fa-code-branch'></i>
        Add any School or Bootcamp that you have attended
      </p>
      <small>*= required field</small>
      <form className='form' onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            value={school}
            onChange={onChange}
            placeholder='* School or Bootcamp'
            name='school'
          />
        </div>
        <div className='form-group'>
          <input
            value={degree}
            onChange={onChange}
            type='text'
            placeholder='* Degree'
            name='degree'
          />
        </div>
        <div className='form-group'>
          <input
            value={fieldofstudy}
            onChange={onChange}
            type='text'
            placeholder='* Field of Study'
            name='fieldofstudy'
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

addEducation.propTypes = {
  addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
