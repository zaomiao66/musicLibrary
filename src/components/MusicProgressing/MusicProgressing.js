import React, { Component } from 'react';
import './MusicProgressing.css';

import btn_play from '../../img/btn_play.png';
import btn_pause from '../../img/btn_pause.png';

export default class MusicProgressing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      widthHaveBeenPlayed: 0,
      startX: null
    };
  }

  moveStart = e => { // 存放移动开始的位置
    this.setState({
      startX: e.touches[0].clientX
    });
    console.log(this.state.startX);
  }

  moving = e => {
    const endX = e.touches[0].clientX;
    const widthHaveBeenPlayedStart = (this.props.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
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
    const widthHaveBeenPlayedStart = (this.props.timesHaveBeenPlayed / this.props.music.map(item => item.du)) * 275;
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

  render() {
    return (
      <div className="MusicProgressingAll">
        {/* <audio src={this.props.music.map(item => item.m_url)} /> */}
        <img
          className="MusicProgressingImg"
          src={this.props.isMusicIsPlaying ? btn_pause : btn_play}
          onClick={() => this.props.controlMusic()}
        />
        <div className="MusicProgressing">
          <div className="MusicProgressingHavePlayed" style={{ width: this.props.widthHaveBeenPlayed }} />
          <span
            className="MusicProgressingButton"
            onTouchStart={this.props.moveStart}
            onTouchEnd={this.props.moveEnd}
            onTouchMove={this.props.moving}
          />
        </div>
      </div>
    );
  }
}
