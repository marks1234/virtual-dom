import { marco, rerun } from "../core.jsx";

export class State<T> {
  private data: T;
  private subscriptions: ((data: T) => void)[];
  static test: Function

  constructor(initialState: T) {
    this.data = initialState;
    this.subscriptions = [];
  }



  subscribe(func: ((data: T) => void)) {
    this.subscriptions.push(func);
  }

  set(newState: T) {
    this.data = newState;
    this.runSubscriptions();
  }

  update(updater: (data: T) => T) {
    this.data = updater(this.data);
    this.runSubscriptions();
  }

  get() {
    return this.data;
  }

  private runSubscriptions() {
    this.subscriptions.forEach(subscriber => subscriber(this.data));
    if (!State.test) {
      State.test = rerun(marco)
    } else {
      State.test = State.test()
    }
  }
}