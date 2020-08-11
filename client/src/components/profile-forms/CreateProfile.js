import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { createProfile } from '../../actions/profile';
import Alert from '../Layout/Alert';

const CreateProfile = ({ createProfile, history }) => {
  const [formData, setFormData] = useState({
    company: '',
    website: '',
    location: '',
    status: '',
    skills: '',
    githubusername: '',
    bio: '',
    twitter: '',
    facebook: '',
    linkedin: '',
    youtube: '',
    instagram: '',
  });
  const [toggleSocialMedia, setToggleSocialMedia] = useState(false);
  const {
    company,
    website,
    location,
    status,
    skills,
    githubusername,
    bio,
    twitter,
    facebook,
    linkedin,
    youtube,
    instagram,
  } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    createProfile(formData, history);
  };
  return (
    <section className='container'>
      <Alert />
      <h1 className='large text-primary'>Create Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i>
        Let's get some information to make your profile stand out
      </p>
      <small>* = required fields</small>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <select name='status' value={status} onChange={(e) => onChange(e)}>
            <option value='0'>* Select Professional Status</option>
            <option value='Developer'>Developer</option>
            <option value='Junior Developer'>Junior Developer</option>
            <option value='Senior Developer'>Senior Developer</option>
            <option value='Manager'>Manager</option>
            <option value='Student or Learning'>Student or Learning</option>
            <option value='Instructor or Teacher'>Instructor or Teacher</option>
            <option value='Intern'>Intern</option>
            <option value='Other'>Other</option>
          </select>
          <small className='form-text'>
            Give us an idea or where you are at in your career
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Company'
            name='company'
            value={company}
            onChange={(e) => onChange(e)}
          />
          <small className='form-text'>
            Could be your own company or one you work for
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Website'
            name='website'
            value={website}
          />
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Location'
            name='location'
            value={location}
          />
          <small className='form-text'>
            City and State suggested (eg. Bostan, MA)
          </small>
        </div>
        <div className='form-group'>
          <input
            onChange={(e) => onChange(e)}
            type='text'
            placeholder='Skills'
            name='skills'
            value={skills}
          />
          <small className='form-text'>
            Please use comma seperated values (eg. HTML, CSS, JavaScript, PHP)
          </small>
        </div>
        <div className='form-group'>
          <input
            type='text'
            onChange={(e) => onChange(e)}
            placeholder='Github Username'
            name='githubusername'
            value={githubusername}
          />
          <small className='form-text'>
            If you want your latest repos and a Github link, include your
            username
          </small>
        </div>
        <div className='form-group'>
          <textarea
            onChange={(e) => onChange(e)}
            placeholder='A short bio of yourself'
            name='bio'
            value={bio}
          >
            Tell us a little about yourself
          </textarea>
        </div>

        <div className='my-2'>
          <button
            onClick={(e) => setToggleSocialMedia(!toggleSocialMedia)}
            className='btn btn-light'
            type='button'
          >
            {toggleSocialMedia ? 'Hide ' : 'Add '} Social Network Links
          </button>
          <span>Optional</span>
        </div>
        {toggleSocialMedia ? (
          <React.Fragment>
            <div className='form-group social-input'>
              <i className='fab fa-twitter fa-2x'></i>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Twitter URL'
                name='twitter'
                value={twitter}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-facebook fa-2x'></i>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Facebook URL'
                name='facebook'
                value={facebook}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-youtube fa-2x'></i>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Youtube URL'
                name='youtube'
                value={youtube}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-instagram fa-2x'></i>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Instagram URL'
                name='instagram'
                value={instagram}
              />
            </div>
            <div className='form-group social-input'>
              <i className='fab fa-linkedin fa-2x'></i>
              <input
                onChange={(e) => onChange(e)}
                type='text'
                placeholder='Linkedin URL'
                name='linkedin'
                value={linkedin}
              />
            </div>
          </React.Fragment>
        ) : null}

        <input type='submit' className='btn btn-primary my-1' />
        <Link to='/dashboard' className='btn btn-light my-1'>
          Go back
        </Link>
      </form>
    </section>
  );
};

CreateProfile.propTypes = {
  createProfile: PropTypes.func.isRequired,
};

export default connect(null, { createProfile })(withRouter(CreateProfile));
