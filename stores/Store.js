'use strict';

class Store {
  constructor(initialState) {
    this.state = initialState;
    this.listeners = [];
  }

  addListener(listener) {
    this.listers = [...this.listeners, listener]
    return () => this.listeners = this.listeners.filter(cListener => cListener !== listener);
  }

  setState(state) {
    this.state = state;
    for (const listener of this.listeners) {
      listener.call(this, state);
    }
  }

  getState() {
    return this.state;
  }
}

module.exports = Store;
