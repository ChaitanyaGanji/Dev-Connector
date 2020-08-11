import {
  GET_PROFILE,
  PROFILE_ERROR,
  UPDATE_PROFILE,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  GET_REPOS,
  GET_PROFILES,
} from '../utils/types';
import serverAPI from '../utils/serverAPI';
import { setAlert } from './alerts';

//Get Current User
export const getCurrentProfile = () => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.get('/api/profile/me', config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//Get All Profiles
export const getProfiles = () => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.get('/api/profile/', config);
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (e) {
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//Get Profile by id
export const getProfileById = (userId) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.get(`/api/profile/user/${userId}`, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (e) {
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//Get Githubrepos
export const getGitHubRepos = (username) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await serverAPI.get(`/api/profile/github/${username}`, config);
    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  } catch (e) {
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//Create and Edit Profile
export const createProfile = (formData, history, edit = false) => async (
  dispatch
) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await serverAPI.post(
      '/api/profile',
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    if (!edit) {
      dispatch(setAlert('Profile is Created', 'success'));
      history.push('/dashboard');
    }
    if (edit) {
      dispatch(setAlert('Profile is updated', 'success'));
      history.push('/dashboard');
    }
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//Add experience
export const addExperience = (formData, history) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await serverAPI.put(
      '/api/profile/experience',
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Added', 'success'));
    history.push('/dashboard');
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

// Add Education
export const addEducation = (formData, history) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };

  try {
    const res = await serverAPI.put(
      '/api/profile/education',
      JSON.stringify(formData),
      config
    );
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Added', 'success'));
    history.push('/dashboard');
  } catch (e) {
    const errors = e.response.data.errors;
    if (errors && errors.length > 0) {
      errors.map((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    if (e.response && e.response.statusText) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};

//delete experience
export const deleteExperience = (id) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.delete(`/api/profile/experience/${id}`, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Experience Deleted', 'success'));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//delete education
export const deleteEducation = (id) => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await serverAPI.delete(`/api/profile/education/${id}`, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    dispatch(setAlert('Education Deleted', 'success'));
  } catch (e) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Delete Account
export const deleteAccount = () => async (dispatch) => {
  let token;
  if (localStorage.getItem('token')) {
    token = localStorage.getItem('token');
  }
  const config = {
    headers: {
      'x-auth-token': token,
      'Content-Type': 'application/json',
    },
  };
  if (window.confirm('Are you sure you want to delete the account')) {
    try {
      await serverAPI.delete('/api/profile', config);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      dispatch(setAlert('Account Deleted', 'success'));
    } catch (e) {
      dispatch({
        type: PROFILE_ERROR,
        payload: {
          msg: e.response.statusText,
          status: e.response.status,
        },
      });
    }
  }
};
