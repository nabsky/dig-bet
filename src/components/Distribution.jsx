import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import ReactSVG from 'react-svg';

@observer
class Distribution extends React.Component {

  static propTypes = {
    buckets: PropTypes.array.isRequired,
  }

  static defaultProps = {
    buckets: [],
  }

  drawDistributionBuckets(svg, distributionBuckets){
    console.log(distributionBuckets);
  }

  render() {
    return (
      <div style={{width: '100%'}}>
      <ReactSVG
        path="/svg/distribution.svg"
        callback={svg => {this.drawDistributionBuckets(svg, this.props.store.distributionBuckets)}}
        evalScript="always"
        style={{ width: '100%' }}
      />
      </div>
    );
  }
}

export default Distribution;
