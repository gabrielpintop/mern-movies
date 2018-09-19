import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar.jsx';
import Movies from './components/Movies';
import MovieDetail from './components/MovieDetail';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <div className="bg-primary shadow text-light">
          <h1 className="text-center mt-3">MERN Movies</h1>
        </div>
        <div className="container container-fluid mb-5">
          <Route exact path="/" component={Movies} />
          <Switch>
            <Route exact path="/movies" component={Movies} />
            <Route path="/movies/:title" component={MovieDetail} />
          </Switch>
        </div>
      </div>
    );
  }
}

export default App;
