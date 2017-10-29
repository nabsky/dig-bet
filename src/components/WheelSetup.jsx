import React, {Component} from "react";
import {observable, action} from "mobx";
import {observer} from "mobx-react";
import {TextField} from 'material-ui';

@observer
class WheelSetup extends React.Component {

  keyPress = (event) => {
    console.log(`Pressed keyCode ${event.key}`);
    if (event.key >= '0' && event.key <= '9') {
      if(this.props.store.stat[this.props.store.stat.length - 1] >= 999999) {
        event.preventDefault();
      }
    } else if(!this.props.store.statText.endsWith(' ') && this.props.store.stat.length < 37) {
      this.props.store.addSeparator();
      event.preventDefault();
    } else {
      event.preventDefault();
    }
  };

  handleChange = (event) => {
    this.props.store.statText = event.target.value;
  };

  render() {
    return (
      <div style={{ flex: 1 }}>
        <TextField id="text-field-controlled"
          value={this.props.store.statText}
          onKeyPress={this.keyPress}
          onChange={this.handleChange}
          multiLine={true}
          rows={8}
          errorText={'Total: ' + this.props.store.total + ' (' + this.props.store.stat.length + ' of 37)'}/>
      </div>
    );
  }
}

export default WheelSetup;
