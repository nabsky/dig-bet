import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import ReactSVG from 'react-svg';
import SVG from 'svg.js';

@observer
class ToleranceInterval extends React.Component {

  drawToleranceInterval(svg, store){
    const ROULETTE_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

    const outerCircle = svg.querySelector('#SvgjsCircle1082');
    const cx = parseFloat(outerCircle.getAttribute("cx"));
    const cy = parseFloat(outerCircle.getAttribute("cy"));
    const r = parseFloat(outerCircle.getAttribute("r"));
    const innerCircle = svg.querySelector('#SvgjsCircle1083');
    const r0 = parseFloat(innerCircle.getAttribute("r"));

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


    if (shift + minLow * scale < r0) {
        shift = r0 - minLow * scale;//fix shift
    }
    if (shift + maxHigh * scale > r) {
        shift = r - maxHigh * scale;//fix shift
    }

    const draw = SVG(svg);

    //draw max ti
    var arr = [];
    var p0;
    for (var i = 0; i < maxProbabilities.length; i++) {
        var _rx = shift + maxProbabilities[ROULETTE_ORDER[i]] * scale;
        var a = 360.0 * i / maxProbabilities.length - 90;
        var p = [];
        p.push(cx + _rx * Math.cos(a * (Math.PI / 180)));
        p.push(cy + _rx * Math.sin(a * (Math.PI / 180)));
        arr.push(p);
        if (i == 0) {
            p0 = p;
        }
    }
    arr.push(p0);
    draw.polyline(arr).fill({color: 'blue', opacity: 0.05}).stroke({width: 1, color: 'blue'});

    //draw min ti
    arr.length = 0;
    var p0;
    for (var i = 0; i < minProbabilities.length; i++) {
        var _rx = shift + minProbabilities[ROULETTE_ORDER[i]] * scale;
        var a = 360.0 * i / minProbabilities.length - 90;
        var p = [];
        p.push(cx + _rx * Math.cos(a * (Math.PI / 180)));
        p.push(cy + _rx * Math.sin(a * (Math.PI / 180)));
        arr.push(p);
        if (i == 0) {
            p0 = p;
        }
    }
    arr.push(p0);
    draw.polyline(arr).fill({color: 'white'}).stroke({width: 1, color: 'blue'});

    //draw ideal line
    const rn = shift + n * scale;
    draw.circle(rn * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'green',
        "stroke-width": 0.5
    });

    //draw zero line
    const rz = shift + z * scale;
    draw.circle(rz * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'red',
        opacity: 0.5,
        "stroke-width": 0.5
    });

    //draw double zero line
    const rzz = shift + zz * scale;
    draw.circle(rzz * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'black',
        opacity: 0.5,
        "stroke-width": 0.5
    });
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
