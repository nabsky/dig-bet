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
