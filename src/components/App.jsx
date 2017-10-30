import React, {Component} from "react";
import PropTypes from 'prop-types';
import DevTools from "mobx-react-devtools";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WheelSetup from "./WheelSetup";
import StatView from "./StatView";

class App extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = {
    store: null,
  }

  render() {
    return  <MuiThemeProvider>
              <div style={{ display: 'flex' }}>
                <DevTools />
                <WheelSetup store={this.props.store} />
                <StatView store={this.props.store} />
              </div>
            </MuiThemeProvider>;
  }

}

export default App;
