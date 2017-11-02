import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import ReactSVG from 'react-svg';
import SVG from 'svg.js';

@observer
class ToleranceInterval extends React.Component {

  ROULETTE_ORDER = [0, 32, 15, 19, 4, 21, 2, 25, 17, 34, 6, 27, 13, 36, 11, 30, 8, 23, 10, 5, 24, 16, 33, 1, 20, 14, 31, 9, 22, 18, 29, 7, 28, 12, 35, 3, 26];

  getPointColor(lb, hb, z, zz) {
      if (lb > z) {
          return "#ff0000";
      } else if (hb < zz) {
          return "#333333";
      } else if ((hb < z) && (lb > zz)) {
          return "#42A5F5";
      }
      return "#ffffff";
  };


  polarToCartesian(centerX, centerY, radius, angleInDegrees) {
      var angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

      return {
          x: centerX + (radius * Math.cos(angleInRadians)),
          y: centerY + (radius * Math.sin(angleInRadians))
      };
  };

  describeArc(x, y, radius, startAngle, endAngle) {

      var start = this.polarToCartesian(x, y, radius, endAngle);
      var end = this.polarToCartesian(x, y, radius, startAngle);

      var largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      var d = [
          "M", start.x, start.y,
          "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y
      ].join(" ");

      return d;
  };

  getPoliline(values, cx, cy, shift, scale) {
    var arr = [];
    var p0;
    for (var i = 0; i < values.length; i++) {
      var _rx = shift + values[this.ROULETTE_ORDER[i]] * scale;
      var a = 360.0 * i / values.length - 90;
      var p = [];
      p.push(cx + _rx * Math.cos(a * (Math.PI / 180)));
      p.push(cy + _rx * Math.sin(a * (Math.PI / 180)));
      arr.push(p);
      if (i == 0) {
          p0 = p;
      }
    }
    arr.push(p0);
    return arr;
  };


  drawToleranceInterval(svg, store){
    const outerCircle = svg.querySelector('#SvgjsCircle1082');
    const cx = parseFloat(outerCircle.getAttribute("cx"));
    const cy = parseFloat(outerCircle.getAttribute("cy"));
    const r = parseFloat(outerCircle.getAttribute("r"));
    const innerCircle = svg.querySelector('#SvgjsCircle1083');
    const r0 = parseFloat(innerCircle.getAttribute("r"));

    const probabilities = store.probabilities;
    const minProbabilities = store.minProbabilities;
    const maxProbabilities = store.maxProbabilities;
    const quadrantFirstNumber = store.quadrantFirstNumber;

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
    var arr = this.getPoliline(maxProbabilities, cx, cy, shift, scale);
    draw.polyline(arr).fill({color: '#42a5f5', opacity: 0.05}).stroke({width: 1, color: '#42a5f5'});

    //draw min ti
    arr = this.getPoliline(minProbabilities, cx, cy, shift, scale);
    draw.polyline(arr).fill({color: 'white'}).stroke({width: 1, color: '#42a5f5'});

    //draw ideal line
    const rn = shift + n * scale;
    draw.circle(rn * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'green',
        "stroke-width": 1
    });

    //draw zero line
    const rz = shift + z * scale;
    draw.circle(rz * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'red',
        opacity: 0.5,
        "stroke-width": 1
    });

    //draw double zero line
    const rzz = shift + zz * scale;
    draw.circle(rzz * 2).attr({
        cx: cx,
        cy: cy,
        fill: "none",
        stroke: 'black',
        opacity: 0.5,
        "stroke-width": 1
    });

    //draw prob
    arr = this.getPoliline(probabilities, cx, cy, shift, scale);
    draw.polyline(arr).fill('none').stroke({width: 2, color: '#42a5f5'});

    //draw points
    var failed = false;
    for (var i = 0; i < probabilities.length; i++) {
        var rx = shift + scale * probabilities[this.ROULETTE_ORDER[i]];
        var a = 360.0 * i / probabilities.length - 90;
        var color = this.getPointColor(minProbabilities[this.ROULETTE_ORDER[i]], maxProbabilities[this.ROULETTE_ORDER[i]], z, zz);
        if (color == "#ff0000" || color == "#333333") {
            failed = true;
        }
        var c = draw.circle(5).attr({
            cx: cx + rx * Math.cos(a * (Math.PI / 180)),
            cy: cy + rx * Math.sin(a * (Math.PI / 180)),
            fill: color,
            stroke: "#000000",
            "stroke-width": 1
        });
        if (color != "#ffffff") {
            c.attr("stroke", color);
        }

        if (color != "#ffffff" && color != "#42A5F5") {
            var startA = 360.0 * i / 37.0 - 360.0 / 37.0 / 2;
            var endA = 360.0 * i / 37.0 + 360.0 / 37.0 / 2;
            draw.path(this.describeArc(cx, cy, r + 20 * 2, startA, endA))
                .stroke({width: 4, color: color})
                .fill({opacity: 0});

            draw.path(this.describeArc(cx, cy, r0 - 4, startA, endA))
                .stroke({width: 4, color: color})
                .fill({opacity: 0});
        }
    }
    //draw weakest quadrant
    var ws = this.ROULETTE_ORDER.indexOf(quadrantFirstNumber);
    var we = ws + Math.round(store.stat.length/4) - 1;
    var startA = 360.0 * ws / store.stat.length - 360.0 / store.stat.length / 2;
    var endA = 360.0 * we / store.stat.length + 360.0 / store.stat.length / 2;
    draw.path(this.describeArc(cx, cy, r, startA, endA))
        .stroke({width: 3, color: 'red'})
        .fill({opacity: 0});
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
