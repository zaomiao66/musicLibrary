import React, { Component } from 'react';
import './ReminderSlogan.css';

let SloganTroggle = true;
export default class ReminderSlogan extends Component {
    state = {

    }
    render() {
      if (this.props.title === null) {
        return null;
      }
      if (SloganTroggle) {
        SloganTroggle = false;
        return (
          <div className="ReminderSlogan"><span className="ReminderSloganText">{this.props.title}</span></div>
        );
      }
      SloganTroggle = true;
      return (
        <div className="ReminderSloganFalse"><span className="ReminderSloganText">{this.props.title}</span></div>
      );
    }
}
