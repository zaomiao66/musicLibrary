import React, { Component } from 'react';
import './Dialog.css';

export default class Dialog extends Component {
    // defaultProps = {
    //   isActive: true,
    //   title: '111',
    //   type: 'notInput',
    //   onCancel: () => {},
    //   onOk: () => {}
    // }
    state = {
      newName: ''
    }

    getNewName = e => {
      console.log(this.props.value);
      this.setState({
        newName: e.target.value
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
        return 'dialogWindow';
      } return 'dialogWindow showDialogWindow';
    }
    returnDiaLog() {
      return (
        <div>
          <div className={this.getMaskClassName()} />
          <div className={this.getWindowClassName()}>
            <div className="operate">
              <span className="cancleInDialog" onClick={this.props.onCancel}>
                <span className="buttonTextInDialog" >取消</span>
              </span>
              <span className="cancleInDialog borderLeft" onClick={() => this.props.onOk(this.state.newName)}>
                <span className="buttonTextInDialog comfirmInDialog" >确定</span>
              </span>
            </div>

            {
                this.props.dialogType === 'input' ?
                  <div>
                    <div className="content_text_in_rename">
                      <span className="textNameInRename">{this.props.title}</span>
                      <input type="text" onChange={this.getNewName} defaultValue={this.props.value.map(item => item.name)} />
                    </div>

                  </div>
                : <div className="content_text">{this.props.title}</div>
            }
          </div>

        </div>
      );
    }

    render() {
      return (
        this.returnDiaLog()
      );
    }
}
