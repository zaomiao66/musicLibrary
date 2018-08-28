import React, { Component } from 'react';
import './MusicCut.css';
import changeSecToMinute from '../../utility/utility';

import button_cut_music_start from '../../img/button_cut_music_start.png';
import button_cut_music_finish from '../../img/button_cut_music_finish.png';
import button_cut_music_clear from '../../img/button_cut_music_clear.png';
import button_cut_music_start_gray from '../../img/button_cut_music_start_gray.png';
import button_cut_music_finish_gray from '../../img/button_cut_music_finish_gray.png';
import button_cut_music_clear_gray from '../../img/button_cut_music_clear_gray.png';
import cut_music_start from '../../img/cut_music_start.png';
import cut_music_finish from '../../img/cut_music_finish.png';
import btn_play from '../../img/btn_play.png';
import btn_pause from '../../img/btn_pause.png';

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicCutIsPlaying: true,
      timesHaveBeenPlayed: 0,
      widthHaveBeenPlayed: 0,
      startX: null,
      markStartPosition: -1
    };
  }
  setMusicCutPlayerStatus = () => {
    if (this.state.isMusicCutIsPlaying) {
      this.audio.pause();
    } else {
      this.audio.play();
    }
    console.log('bofangshichang', this.audio.currentTime);
    this.setState({
      isMusicCutIsPlaying: !this.state.isMusicCutIsPlaying
    });
  }

  getMaskClassName = () => {
    if (!this.props.isActive) {
      return 'mask hideMask';
    }
    return 'mask showMask';
  }

  getWindowClassName = () => {
    if (!this.props.isActive) {
      return 'MusicCutWindow';
    } if (this.props.type === 'musicPlayer') {
      return 'MusicCutWindowOnlyPlayer showMusicCutWindow';
    }
    return 'MusicCutWindow showMusicCutWindow';
  }


    // 判断标记起点是否显示
    getMusicLeftMarked = () => {
      const { music } = this.props;
      let widthInGetMusicLeftMarked = 0;
      if (music.length !== 0 && music[0].emt !== 0) {
        widthInGetMusicLeftMarked = (music[0].bmt / this.props.music.map(item => item.du)) * 275;
      } else {
        widthInGetMusicLeftMarked = (this.state.markStartPosition / this.props.music.map(item => item.du)) * 275;
      }
      if (this.state.markStartPosition === -1) {
        if (music.length === 0 || music[0].emt === 0) {
          return (
            null
          );
        }
      } return (
        <div className="MusicLeftMarked">
          <span
            style={{ width: widthInGetMusicLeftMarked }}
            className="MusicProgressingLeftGray"
          />
          <img className="MusicProgressingLeftGrayImg" src={cut_music_start} />
        </div>
      );
    }
    // 判断标记终点是否显示
    getMusicRightMarked = () => {
      const { music } = this.props;
      // console.log(music.map(item => item.emt))
      if (music.length === 0 || music[0].emt * 1 === 0) {
        return (
          null
        );
      } return (
        <img
          className="MusicProgressingRightGrayImg"
          style={{ left: 72 + (this.props.music.map(item => item.emt) / this.props.music.map(item => item.du)) * 275 }}
          src={cut_music_finish}
        />
      );
    }
  hideThisCutComponent = () => {
    this.audio.pause();
    this.props.onCancel();
    this.setState({
      isMusicCutIsPlaying: true,
      markStartPosition: -1
    });
  }

  handleAudiosChange = () => {
    console.log(this.audio.currentTime);
    const { music } = this.props;
    const widthHaveBeenPlayed = (this.state.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
    this.setState({
      timesHaveBeenPlayed: this.audio.currentTime,
      widthHaveBeenPlayed
    });
    if (music.length !== 0 && music[0].emt * 1 !== 0 && this.audio.currentTime >= music[0].emt) {
      this.audio.currentTime = music[0].bmt;
    }
    if (music.length !== 0 && music[0].emt * 1 !== 0 && this.audio.currentTime <= music[0].bmt) {
      this.audio.currentTime = music[0].bmt;
    }
  }

  moveStart = e => { // 存放移动开始的位置
    console.log(e.touches);
    this.audio.pause();
    this.setState({
      startX: e.touches[0].clientX,
      isMusicCutIsPlaying: false
    });
    console.log(this.state.startX);
  }

  moving = e => {
    const { music } = this.props;
    const endX = e.touches[0].clientX;
    const widthHaveBeenPlayedStart = (this.state.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
    const moveDistance = endX - this.state.startX;
    console.log(11111111111, moveDistance);
    let newWidth = 0;
    if (widthHaveBeenPlayedStart + moveDistance > 275) {
      newWidth = 275;
    } else if (widthHaveBeenPlayedStart + moveDistance < 0) {
      newWidth = 0;
    } else {
      newWidth = widthHaveBeenPlayedStart + moveDistance;
    }
    if (music.length !== 0 && music[0].emt * 1 !== 0) {
      const farthestDistance = (music[0].emt * 1 / this.props.music.map(item => item.du)) * 275;
      const nearestDistance = (music[0].bmt * 1 / this.props.music.map(item => item.du)) * 275;
      if (widthHaveBeenPlayedStart + moveDistance > farthestDistance) {
        newWidth = farthestDistance;
      } else if (widthHaveBeenPlayedStart + moveDistance < nearestDistance) {
        newWidth = nearestDistance;
      } else {
        newWidth = widthHaveBeenPlayedStart + moveDistance;
      }
    }
    this.setState({
      // timesHaveBeenPlayed: newTime
      widthHaveBeenPlayed: newWidth
    });
  }

  moveEnd = e => { // 移动结束后更新数据
    const { music } = this.props;
    const endX = e.changedTouches[0].clientX;
    const widthHaveBeenPlayedStart = (this.state.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
    const moveDistance = endX - this.state.startX;
    let newTime = 0;
    let newWidth = 0;
    if (widthHaveBeenPlayedStart + moveDistance > 275) {
      newTime = this.props.music.map(item => item.du);
      newWidth = 275;
    } else if (widthHaveBeenPlayedStart + moveDistance < 0) {
      newTime = 0;
      newWidth = 0;
    } else {
      newTime = (widthHaveBeenPlayedStart + moveDistance) / 275 * (this.props.music.map(item => item.du));
      newWidth = widthHaveBeenPlayedStart + moveDistance;
    }
    if (music.length !== 0 && music[0].emt * 1 !== 0) {
      const farthestDistance = (music[0].emt * 1 / this.props.music.map(item => item.du)) * 275;
      const nearestDistance = (music[0].bmt * 1 / this.props.music.map(item => item.du)) * 275;
      if (widthHaveBeenPlayedStart + moveDistance > farthestDistance) {
        newWidth = farthestDistance;
        newTime = music[0].emt * 1;
      } else if (widthHaveBeenPlayedStart + moveDistance < nearestDistance) {
        newWidth = nearestDistance;
        newTime = music[0].bmt * 1;
      } else {
        newWidth = widthHaveBeenPlayedStart + moveDistance;
        newTime = (widthHaveBeenPlayedStart + moveDistance) / 275 * (this.props.music.map(item => item.du));
      }
    }
    this.setState({
      timesHaveBeenPlayed: newTime,
      isMusicCutIsPlaying: true,
      widthHaveBeenPlayed: newWidth
    });
    this.audio.play();
    this.audio.currentTime = newTime;
  }

  // 判断标记起点是否可以用
  adjustMarkStartCanBeUsed = () => {
    const { music } = this.props;
    // console.log(111111111111111111111111111111, this.state.markStartPosition);
    if (this.state.markStartPosition === -1) {
      // console.log(this.props.music.map(item => item.emt));
      // console.log("music.length", music.length);
      // console.log(this.props.music);
      // console.log(music.length === 0 || music[0].emt === 0)
      if (music[0]) {
        console.log(music[0].emt);
      }
      if (music.length === 0 || music[0].emt === 0) {
        return (
          <span className="MusicCutButtonAndtext">
            <img className="MusicCutButtonImg" src={button_cut_music_start} onClick={() => this.clickStartMarkButton()} />
            <span className="MusicCutButtonText">标记起点</span>
            <span className="MusicCutButtonTimeText">00 : 00</span>
          </span>
        );
      }
    } return (
      <span className="MusicCutButtonAndtext">
        <img className="MusicCutButtonImg" src={button_cut_music_start_gray} />
        <span className="MusicCutButtonText">标记起点</span>
        <span className="MusicCutButtonTimeText">
          {music[0].emt === 0 ? changeSecToMinute(this.state.markStartPosition) : changeSecToMinute(music[0].bmt)}
        </span>
      </span>
    );
  }
  // 判断清除是否可用
  adjustClearCanBeUsed = () => {
    const { music } = this.props;
    if (this.state.markStartPosition !== -1 || (music.length !== 0 && music[0].emt * 1 !== 0)) {
      return (
        <span className="MusicCutButtonAndtext">
          <img className="MusicCutButtonImg" src={button_cut_music_clear} onClick={() => this.clickClearButton()} />
          <span className="MusicCutButtonText">清除</span>
        </span>
      );
    } return (
      <span className="MusicCutButtonAndtext">
        <img className="MusicCutButtonImg" src={button_cut_music_clear_gray} />
        <span className="MusicCutButtonText">清除</span>
      </span>
    );
  }
  // 判断标记终点是否可用
  adjustMarkComplishCanBeUsed = () => {
    const { music } = this.props;
    // console.log(music.map(item => item.emt))
    if (music.length === 0 || music[0].emt * 1 === 0) {
      return (
        <span className="MusicCutButtonAndtext">
          <img className="MusicCutButtonImg" src={button_cut_music_finish} onClick={this.clickComplishButton} />
          <span className="MusicCutButtonText">标记终点</span>
          <span className="MusicCutButtonTimeText">{changeSecToMinute(this.props.music.map(item => item.du))}</span>
        </span>
      );
    } return (
      <span className="MusicCutButtonAndtext">
        <img className="MusicCutButtonImg" src={button_cut_music_finish_gray} />
        <span className="MusicCutButtonText">标记终点</span>
        <span className="MusicCutButtonTimeText">{changeSecToMinute(this.props.music.map(item => item.emt))}</span>
      </span>
    );
  }
  // 按标记起点该有的效果
  clickStartMarkButton = () => {
    this.setState({
      markStartPosition: this.state.timesHaveBeenPlayed
    });
  }
  // 点击清除该有的效果
  clickClearButton = () => {
    const { music, Actions } = this.props;
    if (music[0].emt * 1 === 0) {
      this.setState({
        markStartPosition: -1
      });
    } else {
      Actions.clearMusicBmtAndEmt();
      this.setState({
        markStartPosition: -1
      });
    }
  }
  // 点击标记终点发起action
  clickComplishButton = () => {
    const { Actions } = this.props;
    if (this.state.markStartPosition === -1) {
      alert('请先标记起点');
    } else if (this.state.timesHaveBeenPlayed - this.state.markStartPosition <= 10) {
      alert('间隔不能小于10s');
    } else {
      Actions.changeMusicBmpAndEmp(this.state.markStartPosition, this.state.timesHaveBeenPlayed);
      this.setState({
        markStartPosition: -1
      });
    }
  }


    renderMusicCut = () => (
      <div>
        <div className={this.getMaskClassName()} onClick={this.hideThisCutComponent} />
        <div className={this.getWindowClassName()}>
          {this.props.type === 'musicPlayer' ? <div className="aBlackLine" /> :
          <div className="MusicCutButton">
            {this.adjustMarkStartCanBeUsed()}
            {this.adjustClearCanBeUsed()}
            {this.adjustMarkComplishCanBeUsed()}
          </div>
          }
          <div className="MusicProgressingAll">
            {/* <audio src={this.props.music.map(item => item.m_url)} /> */}
            <img
              className="MusicProgressingImg"
              src={this.state.isMusicCutIsPlaying ? btn_pause : btn_play}
              onClick={() => this.setMusicCutPlayerStatus()}
            />
            <div className="MusicProgressing">
              <div className="MusicProgressingHavePlayed" style={{ width: this.state.widthHaveBeenPlayed }} />
              {this.getMusicLeftMarked()}
              <span
                className="MusicProgressingButton"
                onTouchStart={this.moveStart}
                onTouchEnd={this.moveEnd}
                onTouchMove={this.moving}
              />
              {this.getMusicRightMarked()}
            </div>
          </div>
          <div className="MusicTime">
            <span className="MusicTimeText">
              {changeSecToMinute(this.state.timesHaveBeenPlayed)}/{changeSecToMinute(this.props.music.map(item => item.du))}
            </span>
          </div>
          {
            this.props.type === 'musicPlayer' ?
              <div className="MusicName">
                <span className="MusicNameText">
                  {this.props.music.map(item => item.name)}
                </span>
              </div> : null
          }
          {
            this.props.type === 'musicPlayer' ?
              <div className="MusicPlayerButton">
                <span className="MusicPlayerButtonText" onClick={this.hideThisCutComponent} >关闭</span>
              </div> :
              <div className="MusicCutComplish">
                <span className="MusicCutComplishText" onClick={this.hideThisCutComponent}>完成</span>
              </div>
        }
        </div>
        <audio
          ref={audio => { this.audio = audio; }}
          src={this.props.music.length !== 0 ? this.props.music[0].m_url : null}
          autoPlay="autoPlay"
          loop="loop"
          onTimeUpdate={this.handleAudiosChange}
        > 不支持
        </audio>
      </div>
    )

    render() {
      return this.renderMusicCut();
    }
}
