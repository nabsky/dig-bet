import React, {Component} from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {blueGrey400} from 'material-ui/styles/colors';

import StatLine from "./StatLine";

@observer
class StatView extends React.Component {

  onClickHandler(event, stat, index, max){
    const clickPosX = event.pageX - event.target.parentElement.offsetLeft;
    const width = event.target.parentElement.getBoundingClientRect().width;

    stat[index] = Math.ceil(clickPosX * max / width);
  };

  getStatLines() {
    return this.props.store.stat.map((elem, index) => {
      return <StatLine key={index} number={index} count={elem} max={this.props.store.max}
              onClick={(e) => this.onClickHandler(e, this.props.store.stat, index, this.props.store.max)}/>
    });
  }

  render() {
    return (
      <div style={{ flex: 1, height: 37*15, width: 200, backgroundColor: blueGrey400 }}>
        {this.getStatLines()}
      </div>
    );
  }
}

export default StatView;
