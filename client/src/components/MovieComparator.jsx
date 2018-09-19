import React, { Component } from 'react';
import axios from 'axios';

class MovieComparator extends Component {
  constructor(props) {
    super(props);
    this.state = {
      competitors: ['', ''],
      selectors: [],
      winner: '',
      alert: false,
      errors: []
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.api = 'mernMovies/movie/title/';
  }

  handleChange(event) {
    let competitors = this.state.competitors;
    competitors[event.target.id] = event.target.value;
    this.setState({
      competitors: competitors
    });
  }

  showSelectors() {
    let showSelectors = [];
    for (let index = 0; index < this.state.competitors.length; index++) {
      showSelectors.push(this.addMovieSelector(index));
    }
    return showSelectors;
  }

  handleSubmit(event) {
    this.setState({
      errors: [],
      alert: false
    });

    let errors = [];

    let url = '';

    let promises = [];

    this.state.competitors.forEach(title => {
      if (title) {
        url = this.api + title.replace(/ /g, '_');
        promises.push(axios.get(url));
      }
    });

    let moviesToCompare = [];

    axios.all(promises).then(
      axios.spread((mov1, mov2, mov3, mov4) => {
        if (mov1 && mov1.data.success) {
          moviesToCompare.push(mov1.data.movie);
        } else {
          errors.push(<p key="err1">&bull;Movie 1 does not exist.</p>);
        }

        if (mov2 && mov2.data.success) {
          moviesToCompare.push(mov1.data.movie);
        } else {
          errors.push(<p key="err2">&bull;Movie 2 does not exist.</p>);
        }

        if (this.state.competitors.length >= 3 && mov3 && mov3.data.success) {
          moviesToCompare.push(mov1.data.movie);
        } else if (this.state.competitors.length >= 3) {
          errors.push(<p key="err3">&bull;Movie 3 does not exist.</p>);
        }

        if (this.state.competitors.length === 4 && mov4 && mov4.data.success) {
          moviesToCompare.add(mov4.data.movie);
        } else if (this.state.competitors.length === 4) {
          errors.push(<p key="err4">&bull;Movie 4 does not exist.</p>);
        }

        if (errors.length > 0) {
          this.setState({
            errors: errors
          });
        } else {
        }
      })
    );

    event.preventDefault();
  }

  addMovieSelector(movieNumber) {
    return (
      <div className="col-12 mb-2" key={movieNumber}>
        <label htmlFor="movieSelector">Movie {movieNumber + 1}</label>
        <input
          type="text"
          className="form-control"
          id={movieNumber}
          placeholder="Movie name"
          onChange={this.handleChange}
          pos={movieNumber}
        />
      </div>
    );
  }

  showAlert() {
    if (this.state.alert) {
      return (
        <div
          className="alert alert-warning alert-dismissible fade show"
          role="alert"
        >
          You can only compare <strong>4 movies</strong>.
          <button
            type="button"
            className="close"
            data-dismiss="alert"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
      );
    }
  }

  showErrors() {
    if (this.state.errors.length > 0) {
      return (
        <div className="alert alert-danger" role="alert">
          {this.state.errors}
        </div>
      );
    }
  }

  addMovieToCompare() {
    if (this.state.competitors.length < 4) {
      let competitors = this.state.competitors;
      competitors.push('');
      this.setState({
        competitors: competitors
      });
    } else {
      this.setState({
        alert: true
      });
    }
  }

  showButton() {
    if (!this.state.alert) {
      return (
        <button
          type="button"
          className="btn btn-primary mt-3 mr-3"
          onClick={() => this.addMovieToCompare()}
        >
          Add other
        </button>
      );
    }
  }

  render() {
    return (
      <div>
        <hr />
        <form onSubmit={this.handleSubmit}>
          {this.showSelectors()}
          {this.showButton()}
          <button type="submit" className="btn btn-success mt-3">
            Make the comparision
          </button>
          {this.showAlert()}

          {this.showErrors()}
        </form>
      </div>
    );
  }
}

export default MovieComparator;
