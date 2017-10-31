import React, {Component} from "react";
import PropTypes from 'prop-types';
import {observer} from "mobx-react";
import {
  Step,
  Stepper,
  StepLabel,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

import WheelSetup from "./WheelSetup";
import StatView from "./StatView";
import ChiSquared from "./ChiSquared";

@observer
class App extends React.Component {

  static propTypes = {
    store: PropTypes.object.isRequired,
  }

  static defaultProps = {
    store: null,
  }

  state = {
    finished: false,
    stepIndex: 0,
  };

  handleNext = () => {
    const {stepIndex} = this.state;
    this.setState({
      stepIndex: stepIndex + 1,
      finished: stepIndex >= 2,
    });
  };

  handlePrev = () => {
    const {stepIndex} = this.state;
    if (stepIndex > 0) {
      this.setState({stepIndex: stepIndex - 1});
    }
  };

  getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return  <div style={{ display: 'flex'}}>
                  <WheelSetup store={this.props.store} />
                  <StatView store={this.props.store} />
                </div>;
      case 1:
        return  <div style={{ display: 'flex'}}>
                  <ChiSquared value={this.props.store.chiSquared} />
                </div>;
      case 2:
        return 'TODO: Unsafe bets, Strategies';
      default:
        return 'Something went wrong...';
    }
  }


  render() {
    const {finished, stepIndex} = this.state;
    const {store} = this.props;
    const contentStyle = {margin: '0 16px'};

    return    <div style={{ width: '100%', margin: 'auto', display: 'flex', flexDirection: 'column' }}>
                <Stepper activeStep={stepIndex}>
                  <Step>
                    <StepLabel>Enter statistics</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Analyse Data</StepLabel>
                  </Step>
                  <Step>
                    <StepLabel>Learn Strategies</StepLabel>
                  </Step>
                </Stepper>
                <div style={contentStyle}>
                  {finished ? (
                    <div>
                      <a
                        href="#"
                        onClick={(event) => {
                          event.preventDefault();
                          this.setState({stepIndex: 0, finished: false});
                        }}
                      >
                        Click here
                      </a> to reset the example.
                    </div>
                  ) : (
                    <div>
                      <div>{this.getStepContent(stepIndex)}</div>
                      <div style={{marginTop: 12, display: 'flex', justifyContent: 'space-between'}}>
                        <FlatButton
                          label="Back"
                          disabled={stepIndex === 0}
                          onClick={this.handlePrev}
                          style={{marginRight: 12}}
                        />
                        <RaisedButton
                          label={stepIndex === 2 ? 'Finish' : 'Next'}
                          disabled={this.props.store.stat.length != 37}
                          primary={true}
                          onClick={this.handleNext}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>;
  }

}

export default App;
