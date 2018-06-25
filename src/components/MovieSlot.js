import React, { Component } from 'react';
import PropTypes from 'prop-types';
import LinesEllipsis from 'react-lines-ellipsis';
import '../MovieSlot.css';

class MovieSlot extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    poster: PropTypes.string.isRequired,
    genres: PropTypes.array.isRequired,
    actors: PropTypes.array.isRequired,
    synopsis: PropTypes.string.isRequired
  };

  static defaultProps = {
    title: "",
    poster: "",
    genres: [],
    actors: [],
    synopsis: ""
  };

  render() {
    return (
      <div className="Movie">
        <div className="Movie__Column">
          <img src={this.props.poster} title={this.props.title} className="Movie__Poster" />
        </div>
        <div className="Movie__Column">
          <h1>{this.props.title}</h1>
          <div className="Movie__Genres">
            {this.props.genres.map((genre) => <span className="Movie__Genre">{genre}</span>)}
          </div>
          <div className="Movie__Genres">
            {this.props.actors.map((actor) => <span className="Movie__Genre">{actor}</span>)}
          </div>
          <div className="Movie__Synopsis">
            <LinesEllipsis
              text={this.props.synopsis}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </div>
        </div>
      </div>
    )
  }
}

export default MovieSlot