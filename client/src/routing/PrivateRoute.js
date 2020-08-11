import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';
import Login from '../components/Auth/Login';

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      !auth.isAuthenticated && !auth.loading ? (
        <Redirect to='/login' />
      ) : (
        <Component {...props} />
      )
    }
  />
);

/*
const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, loading },
  ...rest
}) => {
  if (!isAuthenticated && !loading) {
    return <Route {...rest} path='/login' component={Login} />;
  } else {
    return <Route {...rest} path='/dashboard' component={Component} />;
  }
};
*/
const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

PrivateRoute.prototypes = {
  auth: PropTypes.object.isRequired,
};
export default connect(mapStateToProps)(PrivateRoute);
