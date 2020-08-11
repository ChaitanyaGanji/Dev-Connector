import { SET_ALERT, REMOVE_ALERT } from '../utils/types';
import { v4 as uuidv4 } from 'uuid';

export const setAlert = (alertMsg, alertType) => (dispatch) => {
  const id = uuidv4();
  dispatch({
    type: SET_ALERT,
    payload: { id, alertMsg, alertType },
  });
  setTimeout(() => {
    dispatch({
      type: REMOVE_ALERT,
      payload: id,
    });
  }, 5000);
};
