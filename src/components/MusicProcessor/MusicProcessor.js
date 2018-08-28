import React, { Component } from 'react';
import Selection from '../Selection/Selection';
import BottomFunctions from '../BottomFunctions/BottomFunctions';
import List from '../List/List';
import Dialog from '../Dialog/Dialog';
// import MusicPlayer from '../MusicPlayer/MusicPlayer';
import MusicCut from '../MusicCut/MusicCut';
import './MusicProcessor.css';
import Tab from '../Tab/Tab'

import button_new_play from '../../img/button_new_play.png';
import button_new_play_gray from '../../img/button_new_play_gray.png';
import button_rename from '../../img/button_rename_red.png';
import button_rename_gray from '../../img/button_rename_gray.png';
import button_cut from '../../img/button_cut.png';
import button_cut_gray from '../../img/button_cut_gray.png';
import button_share from '../../img/button_share.png';
import button_share_gray from '../../img/button_share_gray.png';
import button_delete from '../../img/button_delete.png';
import button_delete_gray from '../../img/button_delete_gray.png';

export default class MusicProcessor extends Component {
  state = {
    isActionDialogActive: false,
    isRenameDialogActive: false,
    isMusicPlayerActive: false,
    musicListwillBePlayed: [],
    musicListwillBeCut: [],
    isMusicCutActive: false,
    dialogTitle: '',
    dialogType: ''
  }


  componentWillMount() {
    const { Actions } = this.props;
    // console.log(Actions);
    // console.log(11111, this.props)
    // Actions.logIn(114);
    Actions.fetchMyList();
    Actions.fetchRecommendList();
  }
  handleShowMusicPlayer = singleSelectList => {
    this.setState({
      isMusicPlayerActive: true,
      musicListwillBePlayed: singleSelectList
    });
  }

  handleHideMusicPlayer = () => {
    this.setState({
      isMusicPlayerActive: false,
      musicListwillBePlayed: [{ du: 1, bmt: 0, emt: 0 }]
    });
  }
  // 音乐剪切
  handleShowMusicCut = singleSelectList => {
    this.setState({
      isMusicCutActive: true,
      musicListwillBeCut: singleSelectList
    });
  }

  handleHideMusicCut = () => {
    this.setState({
      isMusicCutActive: false,
      musicListwillBeCut: [{ du: 1, bmt: 0, emt: 0 }]
    });
  }

  // 这部分是对话框的
  handleOkActionDialog = () => {
    const { Actions } = this.props;
    Actions.deleteSelectMusic();
    this.setState({
      isActionDialogActive: false
    });
  };

handleCancelActionDialog = () => {
  this.setState({
    isActionDialogActive: false
  });
};

handleOkRenameDialog = newName => {
  const { Actions } = this.props;
  Actions.renameSelectMusic(newName);
  // console.log(22222222222, newName);
  this.setState({
    isRenameDialogActive: false
  });
};

handleCancelRenameDialog = () => {
  this.setState({
    isRenameDialogActive: false
  });
};


handleShowActionDialog = (isSingleSelection, singleSelectList, multipleMusicArray) => {
  let title = '';
  if (isSingleSelection) {
    title = `确定删除${singleSelectList[0].name}这首歌吗？`;
  } else {
    title = `确定删除这${multipleMusicArray.length}首歌吗？`;
  }
  this.setState({
    isActionDialogActive: true,
    dialogTitle: title,
    dialogType: 'notInput'
  });
};

handleShowRenameDialog = () => {
  this.setState({
    isRenameDialogActive: true,
    dialogTitle: '请输入新音乐的名称',
    dialogType: 'input'
  });
};

sendToFrends(singleSelectList) {
  alert(`你送了一首${singleSelectList[0].name}给你的朋友`);
}

isMusicCanbeRenamed(isSingleSelection, singleSelectList) {
  if (isSingleSelection && singleSelectList.length !== 0) {
    if (singleSelectList[0].med && !singleSelectList[0].plp) {
      return true;
    }
  } return false;
}
isMusicCanBeCut(isSingleSelection, singleSelectList) {
  if (isSingleSelection && singleSelectList.length !== 0) {
    if (singleSelectList[0].med) {
      return true;
    }
  } return false;
}
isMusicCanBeDelete(isSingleSelection, singleSelectList, multipleSelectList) {
  if (isSingleSelection) {
    if (singleSelectList && singleSelectList.length !== 0) {
      if (singleSelectList[0].med) {
        return true;
      }
    } return false;
  } console.log(1111, multipleSelectList);
  if (multipleSelectList && multipleSelectList.length !== 0) {
    for (let t = 0; t < multipleSelectList.length; t++) {
      console.log(11111111111111, !multipleSelectList[t].med);
      if (!multipleSelectList[t].med) {
        return false;
      }
    } return true;
  } return null;
}
render() {
  const {
    myList, recommendList, isSingleSelection,
    singleMusicArray, Actions, multipleMusicArray,
    singleSelectList, multipleSelectList
  } = this.props;
  return (
    <div className="MusicProcessor">
      <Selection isSingleSelection={isSingleSelection} Actions={Actions} />
      <List
        title="我的音乐"
        Actions={Actions}
        arr={myList}
        isSingleSelection={isSingleSelection}
        singleMusicArray={singleMusicArray}
        multipleMusicArray={multipleMusicArray}
      />
      <List
        title="推荐音乐"
        Actions={Actions}
        arr={recommendList}
        isSingleSelection={isSingleSelection}
        singleMusicArray={singleMusicArray}
        multipleMusicArray={multipleMusicArray}
      />
      <BottomFunctions>
        {/* <div
          status={singleSelectList.length !== 0 && isSingleSelection}
          pic={button_new_play}
          graypic={button_new_play_gray}
          onTouch={() => this.handleShowMusicPlayer(singleSelectList)}
        >播放
        </div> */}
        <Tab
          status={singleSelectList.length !== 0 && isSingleSelection}
          pic={button_new_play}
          graypic={button_new_play_gray}
          onTouch={() => this.handleShowMusicPlayer(singleSelectList)}
        >播放</Tab>
        <Tab
          status={this.isMusicCanbeRenamed(isSingleSelection, singleSelectList)}
          pic={button_rename}
          graypic={button_rename_gray}
          onTouch={this.handleShowRenameDialog}
        >重命名
        </Tab>
        <Tab
          status={this.isMusicCanBeCut(isSingleSelection, singleSelectList)}
          pic={button_cut}
          graypic={button_cut_gray}
          onTouch={() => this.handleShowMusicCut(singleSelectList)}
        >选取片段
        </Tab>
        <Tab
          status={this.isMusicCanBeCut(isSingleSelection, singleSelectList)}
          pic={button_share}
          graypic={button_share_gray}
          onTouch={() => this.sendToFrends(singleSelectList)}
        >送给朋友
        </Tab>
        <Tab
          status={this.isMusicCanBeDelete(isSingleSelection, singleSelectList, multipleSelectList)}
          pic={button_delete}
          graypic={button_delete_gray}
          onTouch={() => this.handleShowActionDialog(isSingleSelection, singleSelectList, multipleMusicArray)}
        >删除
        </Tab>
      </BottomFunctions>
      <Dialog
        isActive={this.state.isActionDialogActive}
        title={this.state.dialogTitle}
        onOk={this.handleOkActionDialog}
        onCancel={this.handleCancelActionDialog}
      />
      <Dialog
        isActive={this.state.isRenameDialogActive}
        title={this.state.dialogTitle}
        dialogType={this.state.dialogType}
        onOk={this.handleOkRenameDialog}
        onCancel={this.handleCancelRenameDialog}
        value={singleSelectList}
      />
      {/* <MusicPlayer
        isActive={this.state.isMusicPlayerActive}
        onCancel={this.handleHideMusicPlayer}
        music={this.state.musicListwillBePlayed}
      /> */}
      <MusicCut
        isActive={this.state.isMusicPlayerActive}
        onCancel={this.handleHideMusicPlayer}
        music={this.state.musicListwillBePlayed}
        type="musicPlayer"
        Actions={Actions}
      />
      <MusicCut
        isActive={this.state.isMusicCutActive}
        onCancel={this.handleHideMusicCut}
        music={this.state.musicListwillBeCut}
        type="musicCut"
        Actions={Actions}
      />
    </div>);
}
}
