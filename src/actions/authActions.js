import jwtDecode from 'jwt-decode';

import authService from '../services/authService';
import setAuthorizationHeader from '../utils/setAuthorizationHeader';
import { CLEAR_CURRENT_USER, SET_CURRENT_USER } from './types';

export const setCurrentUser = (user = {}) => ({
  type: SET_CURRENT_USER,
  payload: user
});

export const clearCurrentUser = () => ({
  type: CLEAR_CURRENT_USER
});

/**
 * Login user.
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

    setAuthorizationHeader(token);
    const decoded = jwtDecode(token);
    dispatch(setCurrentUser(decoded));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Logout user.
 */
export const logoutUser = () => (dispatch) => {
  setAuthorizationHeader();
  dispatch(clearCurrentUser());
};
