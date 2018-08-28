import React, { Component } from 'react';
import './BottomFuctions.css';

export default class BottomFunctions extends Component {
  constructor() {
    super();
    this.state = {

    };
  }
  mapAndPrintBottomFunctions = () => {
    return React.Children.map(this.props.children, element => {
      if (element.props.status) {
        return (
          <div onClick={element.props.onTouch} className="picAndTextInBottom">
            <img className="picInbottom" src={element.props.pic} />
            <span className="canBeSelectedText">{element}</span>
          </div>
        );
      }
      return (
        <div className="picAndTextInBottom">
          <img className="picInbottom" src={element.props.graypic} />
          <span className="cannotBeSelectedText">{element}</span>
        </div>
      );
    });
  }
  render() {
    return (
      <div className="BottomFunctions">
        {this.mapAndPrintBottomFunctions() }
      </div>
    );
  }
}
