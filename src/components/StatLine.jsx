import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";

@observer
class StatLine extends React.Component {

  static propTypes = {
    number: PropTypes.number,
    count: PropTypes.number,
    max: PropTypes.number,
    onClick: PropTypes.func,
  }

  static defaultProps = {
    number: 0,
    count: 0,
    max: 0,
  }

  render() {
    return (
      <div style={{ width: '100%', position: 'relative' }} onClick={this.props.onClick}>
        <div style={{ height:15, backgroundColor: '#42A5F5', width: `calc(100% * ${this.props.count} / ${this.props.max})` }}></div>
        <div style={{position: 'absolute', top: 0, left: 5}}>{this.props.number}</div>
        <div style={{position: 'absolute', top: 0, right: 5}}>{this.props.count}</div>
      </div>
    );
  }
}

export default StatLine;
