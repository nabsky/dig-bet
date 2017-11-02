import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import ReactSVG from 'react-svg';
import SVG from 'svg.js';

@observer
class ToleranceInterval extends React.Component {

  drawToleranceInterval(svg, store){
    const outerCircle = svg.querySelector('#SvgjsCircle1082');
    const cx = outerCircle.getAttribute("cx");
    const cy = outerCircle.getAttribute("cy");
    const r = outerCircle.getAttribute("r");
    const innerCircle = svg.querySelector('#SvgjsCircle1083');
    const r0 = innerCircle.getAttribute("r");

    const minProbabilities = store.minProbabilities;
    const maxProbabilities = store.maxProbabilities;

    //calc scale
    let minLow = Math.min(...minProbabilities);
    let maxHigh = Math.max(...maxProbabilities);

    const n = 1.0/store.stat.length;
    const z = 1.0/(store.stat.length - 1);
    const zz = 1.0/(store.stat.length + 1);

    if (z > maxHigh) {
      maxHigh = z;//fix max
    }
    if (zz < minLow) {
      minLow = zz;//fix min
    }

    const scale = (r - r0 ) / (maxHigh - minLow);
    let shift = r0 + (r - r0) / 2 - z * scale;//shift zero coord to center


    if (shift + min * scale < r0) {
        shift = r0 - min * scale;//fix shift
    }
    if (shift + max * scale > r) {
        shift = r - max * scale;//fix shift
    }



    const draw = SVG(svg);
    const rect = draw.rect(100, 100);
  }

  render() {
    return (
      <div style={{width: '100%'}}>
      <ReactSVG
        path="/svg/wheel.svg"
        callback={svg => {this.drawToleranceInterval(svg, this.props.store)}}
        evalScript="always"
        style={{ width: '100%' }}
      />
      </div>
    );
  }
}

export default ToleranceInterval;
