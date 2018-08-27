import { combineReducers } from 'redux';
import userInfo from './logIn';
import musicLibraryReducer from './musicLibrary';

export default combineReducers({
  userInfo,
  musicLibraryReducer
});
