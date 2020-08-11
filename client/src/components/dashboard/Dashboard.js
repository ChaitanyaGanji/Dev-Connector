import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import Spinner from '../Layout/Spinner';
import { Link } from 'react-router-dom';
import Alert from '../Layout/Alert';
import DashboardActions from './DashboardActions';
import Experience from './Experience';
import Education from './Education';

const Dashboard = ({
  auth: { user },
  profile: { profile, loading },
  getCurrentProfile,
  deleteAccount,
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  const renderProfile = () => {
    if (profile === null) {
      return (
        <Fragment>
          <Alert />
          <p>
            You have'nt setup your profile, please click on below link to setup
            the same
          </p>
          <Link to='/create-profile' className='btn btn-primary my-1'>
            Create Profile
          </Link>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <div className='my-2'>
            <button onClick={(e) => deleteAccount()} className='btn btn-danger'>
              <i className='fas fa-user-minus'></i> Delete Account
            </button>
          </div>
        </Fragment>
      );
    }
  };

  const renderData = () => {
    if (loading && profile === null) {
      return <Spinner />;
    } else {
      return (
        <Fragment>
          <Alert />
          <h1 className='large text-primary'>Dashboard</h1>
          <p className='lead'>
            <i className='fas fa-user'></i> Welcome {user && user.name}
          </p>
          {renderProfile()}
        </Fragment>
      );
    }
  };
  return <section className='container'>{renderData()}</section>;
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    profile: state.profile,
  };
};
Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object,
  profile: PropTypes.object,
  deleteAccount: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  Dashboard
);
