'use strict'

const React = require('react');
const actions = require('../actions');
const resultStore = require('../stores/resultStore');

const SearchField = require('./SearchField');
const SearchResults = require('./SearchResults');

class Autocomplete extends React.Component {
  constructor(props) {
    super(props);
  this.state = {
      query: '',
      results: resultStore.getState().results
    };
    this.onResultStoreChange = this.onResultStoreChange.bind(this);
    this.onSearchFieldChange = this.onSearchFieldChange.bind(this);
  }

  onResultStoreChange(newResultStoreState) {
    this.setState({
      results: newResultStoreState.results
    });
  }

   onSearchFieldChange(ev) {
    const query = ev.target.value;
    this.setState({ query });

     if (query.length > 2) {
      actions.search(query);
    }
  }

   componentDidMount() {
    this.removeListener = resultStore.addListener(this.onResultStoreChange);
  }

   componentWillUnmount() {
    this.removeListener();
  }

  render() {
    return (
      <div className='autocomplete'>
        <h2>Autocomplete</h2>
        <SearchField value={this.state.query} onChange={this.onSearchFieldChange} />
        <SearchResults results={this.state.results} />
      </div>
    );
  }
}

module.exports = Autocomplete;