import authService from '../services/authService';
import setAuthorization from '../utils/setAuthorization';
import { SET_CURRENT_USER } from './types';

export const setCurrentUser = (user = {}) => ({
  type: SET_CURRENT_USER,
  payload: user
});

/**
 * Attempt to login user.
 *
 * @param {Object} loginInfo
 * @param {String} loginInfo.email
 * @param {String} loginInfo.password
 */
export const loginUser = ({ email, password }) => async (dispatch) => {
  try {
    const { data } = await authService.login({ email, password });
    const { success, token } = data;

    if (!success) throw Error('Login failed');

    setAuthorization(token);
    dispatch(setCurrentUser(data));
  } catch (error) {
    console.log(error);
  }
};
