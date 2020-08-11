import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  DELETE_POST,
  ADD_POST,
  GET_POST,
  ADD_COMMENT,
  REMOVE_COMMENT,
} from '../utils/types';
import serverAPI from '../utils/serverAPI';
import { setAlert } from './alerts';

//GET POSTS
export const getPosts = () => async (dispatch) => {
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
    const res = await serverAPI.get('/api/posts', config);
    dispatch({
      type: GET_POSTS,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Remove Like
export const removeLike = (postId) => async (dispatch) => {
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
    const res = await serverAPI.delete(`api/posts/unlike/${postId}`, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Add Like
export const addLike = (postId) => async (dispatch) => {
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
    const res = await serverAPI.put(`api/posts/like/${postId}`, {}, config);
    dispatch({
      type: UPDATE_LIKES,
      payload: { postId, likes: res.data },
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Delete Post
export const deletePost = (postId) => async (dispatch) => {
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
    const res = await serverAPI.delete(`api/posts/${postId}`, config);
    dispatch({
      type: DELETE_POST,
      payload: postId,
    });
    dispatch(setAlert('Post Removed', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Add Post
export const addPost = (formData) => async (dispatch) => {
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
    const res = await serverAPI.post('api/posts', formData, config);
    dispatch({
      type: ADD_POST,
      payload: res.data,
    });
    dispatch(setAlert('Post Created', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Get Post
export const getPost = (id) => async (dispatch) => {
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
    const res = await serverAPI.get(`api/posts/${id}`, config);
    dispatch({
      type: GET_POST,
      payload: res.data,
    });
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Add Comment
export const addComment = (postId, formData) => async (dispatch) => {
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
      `api/posts/comment/${postId}`,
      formData,
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: res.data,
    });
    dispatch(setAlert('Comment Added', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};

//Delete Comment
export const deleteComment = (postId, commentId) => async (dispatch) => {
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
    const res = await serverAPI.delete(
      `api/posts/comment/${postId}/${commentId}`,
      config
    );
    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    });
    dispatch(setAlert('Comment Removed', 'success'));
  } catch (e) {
    dispatch({
      type: POST_ERROR,
      payload: {
        msg: e.response.statusText,
        status: e.response.status,
      },
    });
  }
};
