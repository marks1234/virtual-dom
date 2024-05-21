export class State {
  constructor(initialState) {
    this.data = initialState;
    this.subscriptions = [];
  }
  subscribe(func) {
    this.subscriptions.push(func);
  }
  set(newState) {
    this.data = newState;
    this.runSubscriptions();
  }
  update(updater) {
    this.data = updater(this.data);
    this.runSubscriptions();
  }
  get() {
    return this.data;
  }
  runSubscriptions() {
    this.subscriptions.forEach(subscriber => subscriber(this.data));
  }
}