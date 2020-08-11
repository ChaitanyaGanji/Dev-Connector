import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  AUTH_FAIL,
  LOAD_USER,
  LOGOUT,
  ACCOUNT_DELETED,
} from '../utils/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const setSuccess = (state, payload) => {
  localStorage.setItem('token', payload.token);
  return {
    ...state,
    ...payload,
    isAuthenticated: false,
    loading: false,
  };
};
const setFail = (state, payload) => {
  localStorage.removeItem('token');
  return {
    ...state,
    token: null,
    isAuthenticated: false,
    loading: false,
    user: null,
  };
};
export const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      return setSuccess(state, payload);
    case REGISTER_FAIL:
    case AUTH_FAIL:
    case ACCOUNT_DELETED:
    case LOGIN_FAIL:
    case LOGOUT:
      return setFail(state, payload);
    case LOAD_USER:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: payload,
      };
    default:
      return state;
  }
};
