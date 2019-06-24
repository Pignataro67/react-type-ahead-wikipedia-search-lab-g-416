'use strict';

const Store = require('./Store');

class ResultStore extends Store {
  constructor(initialState = {results: [], updated: new Date()}) {
    super(initialState);
  }

   isOutdated(requestDate) {
    return requestDate.getTime() < this.getState().updated.getTime();
  }
}

module.exports = new ResultStore();
