import React, { Component } from 'react';
import './MusicPlayer.css';
import changeSecToMinute from '../../utility/utility';

import btn_play from '../../img/btn_play.png';
import btn_pause from '../../img/btn_pause.png';

export default class MusicPlayer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMusicIsPlaying: true,
      timesHaveBeenPlayed: 0,
      widthHaveBeenPlayed: 0,
      startX: null
    };
  }

  // componentDidMount() {
  //   const musicLengthNow = this.audio.currentTime;
  // }

    setMusicPlayerStatus = () => {
      if (this.state.isMusicIsPlaying) {
        this.audio.pause();
      } else {
        this.audio.play();
      }
      console.log('bofangshichang', this.audio.currentTime);
      this.setState({
        isMusicIsPlaying: !this.state.isMusicIsPlaying
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
        return 'MusicPlayerWindow';
      } return 'MusicPlayerWindow showMusicPlayerWindow';
    }

    hideThisComponent = () => {
      this.audio.pause();
      this.props.onCancel();
      this.setState({
        isMusicIsPlaying: true
      });
    }

    handleAudiosChange = () => {
      console.log(this.audio.currentTime);
      const widthHaveBeenPlayed = (this.state.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
      this.setState({
        timesHaveBeenPlayed: this.audio.currentTime,
        widthHaveBeenPlayed
      });
    }

    moveStart = e => { // 存放移动开始的位置
      console.log(e.touches);
      this.audio.pause();
      this.setState({
        startX: e.touches[0].clientX,
        isMusicIsPlaying: false
      });
      console.log(this.state.startX);
    }

    moving = e => {
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
      this.setState({
        // timesHaveBeenPlayed: newTime
        widthHaveBeenPlayed: newWidth
      });
    }

    moveEnd = e => { // 移动结束后更新数据
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
      this.setState({
        timesHaveBeenPlayed: newTime,
        isMusicIsPlaying: true,
        widthHaveBeenPlayed: newWidth
      });
      this.audio.play();
      this.audio.currentTime = newTime;
    }

    renderMusicPlayer = musicNow => (
      <div>
        <div className={this.getMaskClassName()} onClick={this.hideThisComponent} />
        <div className={this.getWindowClassName()}>
          <div className="MusicPlayerButton">
            <span className="MusicPlayerButtonText" onClick={this.hideThisComponent} >关闭</span>
          </div>
          <div className="MusicName">
            <span className="MusicNameText">
              {this.props.music.map(item => item.name)}
            </span>
          </div>
          <div className="MusicTime">
            <span className="MusicTimeText">
              {changeSecToMinute(this.state.timesHaveBeenPlayed)}/{changeSecToMinute(this.props.music.map(item => item.du))}
            </span>
          </div>
          <div className="MusicProgressingAll">
            <img
              className="MusicProgressingImg"
              src={this.state.isMusicIsPlaying ? btn_pause : btn_play}
              onClick={() => this.setMusicPlayerStatus(musicNow)}
            />
            <div className="MusicProgressing">
              <div className="MusicProgressingHavePlayed" style={{ width: this.state.widthHaveBeenPlayed }} />
              <span
                className="MusicProgressingButton"
                onTouchStart={this.moveStart}
                onTouchEnd={this.moveEnd}
                onTouchMove={this.moving}
              />
            </div>
          </div>
          <div className="MusicProgressingAll" />
        </div>
        <audio
          ref={audio => { this.audio = audio; }}
          src={this.props.music.length !== 0 ? this.props.music[0].m_url : null}
          autoPlay="autoPlay"
          // loop="loop"
          onTimeUpdate={this.handleAudiosChange}
        > 不支持
        </audio>
      </div>
    )

    render() {
      // const musicNow = new Audio(this.props.music.map(item => item.m_url));
      // console.log('musicNow', this.state.musicNow);
      return this.renderMusicPlayer();
    }
}
