import React from "react";
import { render } from "react-dom";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import DevTools from "mobx-react-devtools";


import App from "./components/App";
import WheelModel from "./models/WheelModel";


const store = new WheelModel();

render(
  <div>
    <MuiThemeProvider>
      <App store={store} />
    </MuiThemeProvider>
    <DevTools />
  </div>,
  document.getElementById("root")
);

for (var i = 0; i < 37; i++) {
  store.addStat(Math.ceil(100 * Math.random()));
}

// playing around in the console
window.store = store;
