import React from "react";
import { render } from "react-dom";
import DevTools from "mobx-react-devtools";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

import WheelSetup from "./components/WheelSetup";
import StatView from "./components/StatView";
import WheelModel from "./models/WheelModel";


const store = new WheelModel();

render(
  <MuiThemeProvider>
    <div style={{ display: 'flex' }}>
      <DevTools />
      <WheelSetup store={store} />
      <StatView store={store} />
    </div>
  </MuiThemeProvider>,
  document.getElementById("root")
);

for (var i = 0; i < 37; i++) {
  store.addStat(Math.ceil(100 * Math.random()));
}

// playing around in the console
window.store = store;
