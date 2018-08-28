import React, { Component } from 'react';
import Header from '../Header/Header';
import TabBar from '../TabBar/TabBar';
import MusicProcessor from '../MusicProcessor/MusicProcessor';
import Tab from '../Tab/Tab';
import './MusicLibrary.css';

import music from '../../img/music.png';
import musicActive from '../../img/musicActive.png';
import search from '../../img/search.png';
import searchActive from '../../img/searchActive.png';
import up from '../../img/up.png';
import upActive from '../../img/upActive.png';


export default class MusicLibrary extends Component {
  goBack() {
    alert('go back!');
  }
  render() {
    // console.log(11111, this.props);
    const {
      myList, recommendList, isSingleSelection,
      Actions, singleMusicArray, multipleMusicArray,
      singleSelectList, multipleSelectList
    } = this.props;
    return (
      <div>
        <Header
          myName={this.props.myName}
          backName="制作影集"
          goBack={this.goBack}
        />
        <TabBar>
          <Tab
            className="myMusicInTaBar"
            name="我的音乐"
            pic={music}
            picactive={musicActive}
          >
            <MusicProcessor
              myList={myList}
              recommendList={recommendList}
              isSingleSelection={isSingleSelection}
              singleMusicArray={singleMusicArray}
              multipleMusicArray={multipleMusicArray}
              singleSelectList={singleSelectList}
              multipleSelectList={multipleSelectList}
              Actions={Actions}
            />
          </Tab>
          <Tab
            name="搜索音乐"
            pic={search}
            picactive={searchActive}
          >
            <div>这里是搜索音乐的部分，正在开发中，敬请期待 </div>
          </Tab>
          <Tab
            name="上传音乐"
            pic={up}
            picactive={upActive}
          >
            <div>这里是上传音乐的部分，正在开发中，敬请期待 </div>
          </Tab>
        </TabBar>
      </div>
    );
  }
}
