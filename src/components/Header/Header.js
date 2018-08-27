import PropTypes from 'prop-types';
import React, { Component } from 'react';
import returnPic from '../../img/return.png';
import './Header.css';

export default class Header extends Component {
  static defaultProps = {
    myName: '',
    backName: '',
    goBack: () => {}
  }
    static propTypes = {
      myName: PropTypes.string.isRequired,
      backName: PropTypes.string.isRequired,
      goBack: PropTypes.func.isRequired
    }

    render() {
      return (
        <div className="Header">
          <span className="HeaderLeft" onClick={this.props.goBack}>
            <img className="HeaderLeftImg"src={returnPic} />
            {this.props.backName.length === 0 ? null : this.props.backName}
          </span>
          <span className="HeaderMid">{this.props.myName}</span>
          <span className="HeaderRight">完成</span>
        </div>
      );
    }
}
