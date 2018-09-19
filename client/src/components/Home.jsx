import React, { Component } from 'react';
import Movies from './Movies';
import MovieComparator from './MovieComparator';

class Home extends Component {
  render() {
    return (
      <div>
        <MovieComparator />
        <hr />
        <Movies />
      </div>
    );
  }
}

export default Home;
