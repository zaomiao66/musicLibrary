import React, { Component } from 'react';
import './List.css';
import ReminderSlogan from '../ReminderSlogan/ReminderSlogan';
import select_music from '../../img/select_music.png';

// let title = null;
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: null
    };
  }
  adjustSingleMusicIsSelected = (itemId, arr) => {
    if (arr.length === 0 || arr[0] !== itemId) {
      return (
        <span className="selectInList" />
      );
    } return (<img className="selectInList" src={select_music} />);
  }

  adjustMultipleMusicIsSelected = (itemId, arr) => {
    if (arr.length === 0 || arr.indexOf(itemId) === -1) {
      return (
        <span className="notSelectInMultipleList" />
      );
    } return (
      <span className="notSelectInMultipleList selectInMultipleList">
        <span className="multipleSelectText">{arr.indexOf(itemId) + 1}</span>
      </span>
    );
  }

  launchAction = id => {
    const { Actions } = this.props;
    console.log(id);
    Actions.selectSingleMusic(id);
  }

  launchMultipleAction = id => {
    const { Actions } = this.props;
    Actions.selectMultipleMusic(id);
    this.setState({

    });
  }

  handleReminderSloganActive = () => {
    alert('只能选5首歌');
    // this.setState({
    //   isReminderSloganAppear: true
    // });
  }

  adjustMultipleSelectedArrayLength(item, idx, arr) {
    if (arr.length === 5 && arr.indexOf(item.id) === -1) {
      return (
        <div className="ListItem" key={idx} onClick={this.handleReminderSloganActive}>
          <span className="notSelectInMultipleList">
            {this.adjustMultipleMusicIsSelected(item.id, arr)}
          </span>
          <span className="textInSelectList">{item.name}
          </span>
        </div>
      );
    } return (
      <div className="ListItem" key={idx} onClick={() => this.launchMultipleAction(item.id)}>
        {this.adjustMultipleMusicIsSelected(item.id, arr)}
        <span className="textInSelectList">{item.name}
        </span>
      </div>
    );
  }

  mapArrToList() {
    const { isSingleSelection, singleMusicArray, multipleMusicArray } = this.props;
    if (isSingleSelection) {
      return (
        <div className="List">
          <div className="ListTitle">{this.props.title}</div>
          {
              this.props.arr.map((item, idx) => (
                <div className="ListItem" key={idx} onClick={() => this.launchAction(item.id)}>
                  {this.adjustSingleMusicIsSelected(item.id, singleMusicArray)}
                  <span className="textInSelectList">{item.name}</span>
                </div>))}
        </div>
      );
    } return (
      <div className="List">
        <div className="ListTitle">{this.props.title}</div>
        {
            this.props.arr.map((item, idx) => (
            this.adjustMultipleSelectedArrayLength(item, idx, multipleMusicArray)
            ))}
        <ReminderSlogan title={this.state.title} />
      </div>
    );
  }
  render() {
    return (
      this.mapArrToList()
    );
  }
}
