import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOAD_USER,
  AUTH_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from '../utils/types';
import { setAlert } from './alerts';
import serverAPI from '../utils/serverAPI';

export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await serverAPI.post('/api/users', body, config);
    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: REGISTER_FAIL,
    });
  }
};

// Load User
export const loadUser = () => async (dispatch) => {
  let token;
  if (localStorage.token) {
    token = localStorage.token;
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.get('/api/auth', config);
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: AUTH_FAIL,
    });
  }
};

//login user
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await serverAPI.post('/api/auth', body, config);
    console.log(res);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadUser());
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    console.log(e.response.data.msg);
    if (e.response && e.response.data && e.response.data.msg) {
      dispatch(setAlert(e.response.data.msg, 'danger'));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//logout
export const logout = () => (dispatch) => {
  console.log('inside logout and dispatch actin');
  dispatch({
    type: CLEAR_PROFILE,
  });
  dispatch({
    type: LOGOUT,
  });
};
