import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions';
import MusicLibrary from '../components/MusicLibrary/MusicLibrary';

class MyMusicLibrary extends React.Component {
  state = {

  };
  componentWillMount() {
    const { Actions } = this.props;
    console.log(Actions);
    // console.log(11111, this.props)
    Actions.logIn(114);
    // Actions.fetchMyList();
    // Actions.fetc/hRecommendList();
  }
  render() {
    // console.log(11111, this.props);
    const {
      userInfo, musicLibraryReducer, Actions
    } = this.props;
    return (
      <MusicLibrary
        Actions={Actions}
        myName={userInfo.nick}
        myList={musicLibraryReducer.myList}
        recommendList={musicLibraryReducer.recommendList}
        isSingleSelection={musicLibraryReducer.isSingleSelection}
        singleMusicArray={musicLibraryReducer.singleMusicArray}
        multipleMusicArray={musicLibraryReducer.multipleMusicArray}
        singleSelectList={musicLibraryReducer.singleSelectList}
        multipleSelectList={musicLibraryReducer.multipleSelectList}
      />
    );
  }
}

function mapStateToProps(state) {
  // console.log('state', state);
  const {
    musicLibraryReducer: {
      musicLibrary, myListIds, recommendListIds, singleMusicArray, multipleMusicArray
    }
  } = state;
  const myList = myListIds.map(id => musicLibrary[id]);
  const recommendList = recommendListIds.map(id => musicLibrary[id]);
  const singleSelectList = singleMusicArray.map(id => musicLibrary[id]);
  const multipleSelectList = multipleMusicArray.map(id => musicLibrary[id]);
  return {
    ...state,
    musicLibraryReducer: {
      ...state.musicLibraryReducer,
      myList,
      recommendList,
      singleSelectList,
      multipleSelectList
    }
  };
}

function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(actionCreators, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(MyMusicLibrary);
