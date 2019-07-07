import { combineReducers } from 'redux';
import user from './user';
import game from './game';

export default combineReducers({
  game,
  user
});
