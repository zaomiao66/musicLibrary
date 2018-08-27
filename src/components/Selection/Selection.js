import React, { Component } from 'react';
import './Selection.css';

export default class Selection extends Component {
    state = {

    };

    selectSelection() {
      const { isSingleSelection, Actions } = this.props;
      if (isSingleSelection) {
        return (
          <div className="Selection">
            <span className="SelectionTitle">
              <div className="circleSelect"><div className="select" /></div>  单选
            </span>
            <span className="SelectionTitle" onClick={Actions.selectMutipleSelection}>
              <div className="circle" /> 多选
            </span>
          </div>
        );
      } return (
        <div className="Selection">
          <span className="SelectionTitle" onClick={Actions.selectSingleSelection}>
            <div className="circle" />  单选
          </span>
          <span className="SelectionTitle">
            <div className="circleSelect"> <div className="select" /></div>
             多选
          </span>
        </div>
      );
    }

    render() {
      return (
        this.selectSelection()
      );
    }
}
