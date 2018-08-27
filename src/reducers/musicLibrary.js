import * as ActionTypes from '../const/ActionTypes';

export default function musicLibraryReducer(state = {
  myListIds: [],
  recommendListIds: [],
  musicLibrary: {},
  singleMusicArray: [],
  multipleMusicArray: [],
  isSingleSelection: true
}, action) {
  switch (action.type) {
    case `${ActionTypes.FETCH_MY_LIST}_SUC`: {
      const myListIds = action.response.result;
      return {
        ...state,
        myListIds,
        musicLibrary: {
          ...state.musicLibrary,
          ...action.response.entities.myList
        }
      };
    }
    case `${ActionTypes.FETCH_RECOMMEND_LIST}_SUC`: {
      const recommendListIds = action.response.result;
      return {
        ...state,
        recommendListIds,
        musicLibrary: {
          ...state.musicLibrary,
          ...action.response.entities.recommendList
        }
      };
    }
    case ActionTypes.SELECT_SINGLE_SELECTION: {
      const isSingleSelection = true;
      const multipleMusicArray = [...state.multipleMusicArray];
      const singleMusicArray = [];
      if (multipleMusicArray.length !== 0) {
        singleMusicArray.push(multipleMusicArray[0]);
      }
      // multipleMusicArray.splice(0, multipleMusicArray.length);
      return {
        ...state,
        isSingleSelection,
        singleMusicArray,
        multipleMusicArray
      };
    }
    case ActionTypes.SELECT_MULTIPLE_SELECTION: {
      const isSingleSelection = false;
      const singleMusicArray = [...state.singleMusicArray];
      const multipleMusicArray = [];
      if (singleMusicArray.length !== 0) {
        multipleMusicArray.push(singleMusicArray[0]);
      }
      // singleMusicArray.splice(0, singleMusicArray.length);
      return {
        ...state,
        isSingleSelection,
        singleMusicArray,
        multipleMusicArray
      };
    }
    case ActionTypes.SELECT_SINGLE_MUSIC: {
      const { id } = action;
      const singleMusicArray = [];
      singleMusicArray.push(id);
      return {
        ...state,
        singleMusicArray
      };
    }
    case ActionTypes.SELECT_MULTIPLE_MUSIC: {
      const { id } = action;
      const newMultipleMusicArray = [...state.multipleMusicArray];
      const index = newMultipleMusicArray.indexOf(id);
      if (index === -1) {
        newMultipleMusicArray.push(id);
      } else {
        newMultipleMusicArray.splice(index, 1);
      }
      return {
        ...state,
        multipleMusicArray: newMultipleMusicArray
      };
    }
    case ActionTypes.DELETE_SELECT_MUSIC: {
      const newMyListIds = [...state.myListIds];
      if (state.isSingleSelection) {
        const index = newMyListIds.indexOf(state.singleMusicArray[0]);
        newMyListIds.splice(index, 1);
      } else {
        for (let t = 0; t < state.multipleMusicArray.length; t++) {
          const index = newMyListIds.indexOf(state.multipleMusicArray[t]);
          newMyListIds.splice(index, 1);
        }
      } return {
        ...state,
        myListIds: newMyListIds,
        singleMusicArray: [],
        multipleMusicArray: []
      };
    }
    case ActionTypes.RENAME_SELECT_MUSIC: {
      const { newName } = action;
      const newMusicLibrary = { ...state.musicLibrary };
      newMusicLibrary[state.singleMusicArray[0]].name = newName;
      return {
        ...state,
        musicLibrary: newMusicLibrary
      };
    }
    case ActionTypes.CHANGE_MUSIC_BMPANDEMP: {
      const { bmt, emt } = action;
      const newMusicLibrary = { ...state.musicLibrary };
      newMusicLibrary[state.singleMusicArray[0]].bmt = bmt;
      newMusicLibrary[state.singleMusicArray[0]].emt = emt;
      return {
        ...state,
        musicLibrary: newMusicLibrary
      };
    }
    case ActionTypes.CLEAR_MUSIC_BMPANDEMP: {
      const newMusicLibrary = { ...state.musicLibrary };
      newMusicLibrary[state.singleMusicArray[0]].bmt = 0;
      newMusicLibrary[state.singleMusicArray[0]].emt = 0;
      return {
        ...state,
        musicLibrary: newMusicLibrary
      };
    }
    default:
      return state;
  }
}

