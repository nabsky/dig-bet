import {observable, computed, action} from "mobx";

export default class WheelModel {

  @observable stat = [];

  @computed
  get total() {
    if (this.stat.length == 0) {
      return 0;
    }
    return this.stat.reduce(function(a, b) {
      return a + b;
    })||0;
  }

  @computed
  get probabilities() {
    var total = this.total;
    return this.stat.map((element, index) => {
      return element / total;
    });
  }

  @computed
  get average() {
    return this.total / this.stat.length;
  }

  @computed
  get averageProbability() {
    return this.probabilities.reduce(function(a, b) {
      return a + b;
    }) / this.probabilities.length;
  }

  @computed
  get chiSquared() {
    var average = this.average;
    return this.stat.map(n => {
      return Math.pow((n - average), 2) / average;
    }).reduce(function(a, b) {
      return a + b;
    });
  }

  @computed
  get standardDeviation() {
    const averageProbability = this.averageProbability;
    return Math.sqrt(this.probabilities.map(prob => {
      return Math.pow((prob - averageProbability), 2);
    }).reduce(function(a, b) {
      return a + b;
    }) / (this.probabilities.length - 1));
  }

  @computed
  get distributionBuckets() {
    const averageProbability = this.averageProbability;
    const standardDeviation = this.standardDeviation;
    const BUCKETS = [-3.5, -3, -2.5, -2.0, -1.5, -1.0, -0.5, 0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 1000.0];
    const distributionBuckets = [];
    for(let i = 0; i < BUCKETS.length; i++){
      distributionBuckets.push([]);
    }
    this.probabilities.map((prob, number) => {
      for(let i = 0; i < BUCKETS.length; i++){
        if(prob < (averageProbability + BUCKETS[i] * standardDeviation)){
          distributionBuckets[i].push(number);
          break;
        }
      }
    });
    return distributionBuckets;
  }

  @computed
  get statText() {
    return this.stat.join(' ');
  }

  set statText(textValue) {
    if(textValue.trim().length == 0){
      this.stat.length = 0;
      return;
    }
    this.stat = textValue.split(' ').map(val => {
      return parseInt(val)||null;
    });
    if(this.stat.length > 37){
      this.stat.length = 37;
    }
  }

  @computed
  get max() {
    return Math.max(...this.stat);
  }

  @action
  addStat(value) {
    this.stat.push(value);
  }

  @action
  addSeparator() {
    this.statText += ' ';
  }
}
