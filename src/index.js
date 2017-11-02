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

const sampleData = [1004, 1082, 1120, 1030, 1196, 1126, 1072, 1105, 1036, 1049, 1107, 1043, 1083, 1019, 989,1080,
1005, 1161, 1123, 1073, 1084, 1180, 1114, 1116, 1023, 1160, 1040, 1008, 1075, 1120, 1108, 1098,
1119, 1033, 1054, 1076, 1087];

for (var i = 0; i < sampleData.length; i++) {
  store.addStat(sampleData[i]);
}

// playing around in the console
window.store = store;
