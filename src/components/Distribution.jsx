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
    const total = distributionBuckets
    .map(bucket => bucket.length)
    .reduce(function(a, b){
      return a + b;
    });
    distributionBuckets.forEach((bucket, index) => {
      let rect = svg.querySelector('#gd' + index);
      let height = parseFloat(rect.getAttribute("height"));
      let y = parseFloat(rect.getAttribute("y"));
      let newHeight = height * bucket.length / total;
      let newY = y + (height - newHeight);
      rect.setAttribute("height", newHeight);
      rect.setAttribute("y", newY);
    });
  }

  render() {
    return (
      <div style={{width: 400}}>
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
