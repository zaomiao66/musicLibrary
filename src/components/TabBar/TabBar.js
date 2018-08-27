import React, { Component } from 'react';
// import PropTypes from 'prop-types';
import './TabBar.css';


export default class TabBar extends Component {
  constructor() {
    super();
    this.state = {
      currentIndex: 0
    };
  }

  getTabBarHeaderItemClassName(index) {
    return index === this.state.currentIndex ? 'TabBarHeaderItem active' : 'TabBarHeaderItem';
  }

  getTabBarContentItemClassName(index) {
    return index === this.state.currentIndex ? 'TabBarcontentItem show' : 'TabBarcontentItem';
  }

  adjustPicInTabBarHeader(srcActive, src, index) { // 判断tabbar中使用那张图片
    if (index === this.state.currentIndex) {
      if (srcActive) {
        return (<img className="TarBarHeaderPic" src={srcActive} />);
      }
    } else if (src) {
      return (<img className="TarBarHeaderPic" src={src} />);
    } return null;
  }

  mapAndPrintTabBarHeader() { // 打印tabbar标题
    return React.Children.map(this.props.children, (element, index) =>
      (
        <span
          onClick={() => { this.setState({ currentIndex: index }); }}
          className={this.getTabBarHeaderItemClassName(index)}
        >
          {this.adjustPicInTabBarHeader(element.props.picactive, element.props.pic, index)}
          {element.props.name}
        </span>));
  }

  mapAndPrintTabBarContent() { // 打印tabbar内容
    return React.Children.map(this.props.children, (element, index) =>
      (<div className={this.getTabBarContentItemClassName(index)}>{element}</div>));
  }


  render() {
    return (
      <div className="TabBar">
        <div className="TabBarHeader">
          {this.mapAndPrintTabBarHeader()}
        </div>
        <div>
          {this.mapAndPrintTabBarContent()}
        </div>
      </div>
    );
  }
}
