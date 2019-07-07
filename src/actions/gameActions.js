import gameService from '../services/gameService';
import { SET_GAME_ID, SET_GAME_MODE } from './types';
import { MODES } from '../constants';

export const setGameId = gameId => ({
  type: SET_GAME_ID,
  payload: gameId
});

export const setGameMode = mode => ({
  type: SET_GAME_MODE,
  payload: mode
});

/**
 * Start a human game
 *
 * @param {Object} gameInfo
 */
export const initiateHumanGame = () => async (dispatch) => {
  try {
    const { data } = await gameService.humanGame();
    dispatch(setGameId(data.gameId));
    dispatch(setGameMode(MODES.HUMAN));
  } catch (error) {
    console.log(error);
  }
};

/**
 * Start a machine game
 *
 * @param {Object} gameInfo
 */
export const initiateMachineGame = () => async (dispatch) => {
  try {
    const { data } = await gameService.machineGame();
    dispatch(setGameId(data.gameId));
    dispatch(setGameMode(MODES.MACHINE));
  } catch (error) {
    console.log(error);
  }
};
