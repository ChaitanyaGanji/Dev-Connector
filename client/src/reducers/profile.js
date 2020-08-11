import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_REPOS,
  GET_PROFILES,
} from '../utils/types';
const initialState = {
  profiles: [],
  profile: null,
  repos: [],
  loading: true,
  error: {},
};

export const profile = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_PROFILE:
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        loading: false,
        error: payload,
      };
    case CLEAR_PROFILE:
      return {
        ...state,
        profile: null,
        loading: false,
        repos: [],
        error: {},
      };
    case GET_REPOS:
      return {
        ...state,
        repos: payload,
        loading: false,
      };
    default:
      return state;
  }
};
