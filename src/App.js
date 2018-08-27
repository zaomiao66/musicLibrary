import React from 'react';
import 'antd/dist/antd.css';
import * as ActionTypes from './const/ActionTypes';


export default class App extends React.PureComponent {
  componentWillMount() {
   
  }
  render() {
    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
