import { normalize } from 'normalizr';
import * as ActionTypes from '../const/ActionTypes';
import * as schemas from '../schema/index';

export function add() {
  return {
    type: ActionTypes.ADD
  };
}

export function remove() {
  return {
    type: ActionTypes.REMOVE
  };
}

export function logIn(mid) {
  return {
    SERVER_API: {
      type: ActionTypes.LOG_IN,
      endpoint: '/login',
      params: {
        mid
      }
    }
  };
}

export function fetchMyList() {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_MY_LIST,
      endpoint: '/music/my_list',
      params: {
        token: '1'
      },
      needToken: true,
      normalizeFuc: response => normalize(response.list, schemas.MYLIST)
    }
  };
}

export function fetchRecommendList() {
  return {
    SERVER_API: {
      type: ActionTypes.FETCH_RECOMMEND_LIST,
      endpoint: '/music/recommend_list',
      params: {
        token: '1'
      },
      needToken: true,
      normalizeFuc: response => normalize(response.list, schemas.RECOMMENDLIST)
    }
  };
}

export function selectSingleSelection() {
  return {
    type: ActionTypes.SELECT_SINGLE_SELECTION
  };
}

export function selectMutipleSelection() {
  return {
    type: ActionTypes.SELECT_MULTIPLE_SELECTION
  };
}

export function selectSingleMusic(id) {
  return {
    type: ActionTypes.SELECT_SINGLE_MUSIC,
    id
  };
}

export function selectMultipleMusic(id) {
  return {
    type: ActionTypes.SELECT_MULTIPLE_MUSIC,
    id
  };
}

export function deleteSelectMusic() {
  return {
    type: ActionTypes.DELETE_SELECT_MUSIC
  };
}

export function renameSelectMusic(newName) {
  return {
    type: ActionTypes.RENAME_SELECT_MUSIC,
    newName
  };
}

export function changeMusicBmpAndEmp(bmt, emt) {
  return {
    type: ActionTypes.CHANGE_MUSIC_BMPANDEMP,
    bmt,
    emt
  };
}

export function clearMusicBmtAndEmt() {
  return {
    type: ActionTypes.CLEAR_MUSIC_BMPANDEMP
  };
}
