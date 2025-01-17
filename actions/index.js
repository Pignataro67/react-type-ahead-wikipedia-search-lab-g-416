'use strict';

const jsonp = require('jsonp');
const resultStore = require('../stores/resultStore');
const wikipedia = require('../utils/wikipedia');

const search = (query) => {
  const requested = new Date();

  return wikipedia.search(query).then((data) => {
    if(resultStore.isOutdated(requested)) {
      return;
    }
    const [query, titles, descriptions, links] = data;
    const results = titles.map((title, index) => ({
      title: title,
      description: descriptions[index],
      link: links[index]
    }));

     resultStore.setState({
      results: results,
      updated: requested
    });
  });
};

module.exports = { search };
