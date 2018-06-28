import React, {Component} from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import '../MovieSlot.css';

class MovieSlot extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: this.props.movie,
    };
  }

  componentDidMount() {
    this.setState({ movie : this.props.movie });
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.movie !== this.state.movie) {
      this.setState({ movie : this.props.movie });
    }
  }

  render() {
    return(
      <div className="Movie">
        <div className="Movie__Column">
          <img src={this.state.movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300${this.state.movie.poster_path}`} title={this.state.movie.title} className="Movie__Poster" />
        </div>
        <div className="Movie__Column">
          <h1>{this.state.movie.title}</h1>
          <div className="Movie__Genres">
            <span className="Movie__Genre">
            {this.state.movie.genres.slice(0,3).map((element, index) => {
              if (index < this.state.movie.genres.length - 1) {
                return this.state.movie.genres[index].name + ', '
              } else {
                return this.state.movie.genres[index].name
              }
            })}</span>
          </div>
          <div className="Movie__Genres">
            {this.state.movie.credits.cast.slice(0, 3).map((element, index) => {
              return(
                <span className="Movie__Genre">{this.state.movie.credits.cast[index].name}</span>
              )
            })}
          </div>
          <div className="Movie__Synopsis">
            <LinesEllipsis
              text={this.state.movie.overview}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSlot;