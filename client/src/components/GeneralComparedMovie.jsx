import React, { Component } from 'react';

class GeneralComparedMovie extends Component {
  constructor(props) {
    super(props);

    this.movie = this.props.movie;
    this.pos = this.props.pos;
  }

  winner(val) {
    if (val === 0) {
      return (
        <h1>
          <span class="badge badge-btn-primary">WINNER</span>
        </h1>
      );
    }
  }

  render() {
    return (
      <div className="card w-100 shadow mb-5">
        {this.winner(this.pos)}
        <img
          className="card-img-top"
          src={this.movie.poster}
          alt={this.movie.title}
        />
        <div className="card-body">
          <p>
            <b>Title:</b> {this.movie.title}
          </p>
          <p>
            <b>Rating:</b> {this.movie.rating}
          </p>
          <p>
            <b>Release year:</b> {this.movie.releaseYear}
          </p>
        </div>
      </div>
    );
  }
}

export default GeneralComparedMovie;
