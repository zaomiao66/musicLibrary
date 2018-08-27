import * as ActionTypes from '../const/ActionTypes';

export default function logIn(state = {}, action) {
  switch (action.type) {
    case `${ActionTypes.LOG_IN}_SUC`: {
      console.log('action', action);
      const newState = action.response;
      return newState;
    }
    default:
      return state;
  }
}
