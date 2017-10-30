import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";

@observer
class ChiSquared extends React.Component {

  static propTypes = {
    min: PropTypes.number,
    value: PropTypes.number.isRequired,
    max: PropTypes.number,
  }

  static defaultProps = {
    min: 21.34,
    value: 0,
    max: 54.44,
  }

  render() {
    return (
      <div style={{ fontFamily: 'sans-serif' }}>
        <div>Pearson&rsquo;s χ²-test:</div>
        <div style={{ marginTop: 20}}>{this.props.min} &le; {Number(this.props.value).toFixed(2)} &le; {this.props.max}</div>
      </div>
    );
  }
}

export default ChiSquared;
