import React, {Component} from 'react';
import LinesEllipsis from 'react-lines-ellipsis';
import '../MovieSlot.css';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardTitle,
  Modal,
  ModalBody, Table
} from "reactstrap";
import PropTypes from "prop-types";

class MovieSlot extends Component {

  static propTypes = {
    movie: PropTypes.shape.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      modal: false
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    return(
      <div className="Movie">
        <div className="Movie__Column" onClick={this.toggle}>
          <img src={this.props.movie.poster_path === null ? 'http://via.placeholder.com/300x450' : `https://image.tmdb.org/t/p/w300${this.props.movie.poster_path}`} title={this.props.movie.title} className="Movie__Poster" alt="Movie Poster"/>
        </div>
        <div className="Movie__Column">
          <h1>{this.props.movie.title}</h1>
          <div className="Movie__Genres">
            <span className="Movie__Genre">
            {this.props.movie.genres.slice(0,3).map((element, index) => {
              if (index < this.props.movie.genres.length - 1) {
                return this.props.movie.genres[index].name + ', '
              } else {
                return this.props.movie.genres[index].name
              }
            })}</span>
          </div>
          <div className="Movie__Genres">
            <span className="Movie__Genre">
            {this.props.movie.credits.cast.slice(0, 3).map((element, index) => {
              if (index < this.props.movie.credits.cast.length - 1) {
                return this.props.movie.credits.cast[index].name + ','
              } else {
                return this.props.movie.credits.cast[index].name
              }
            })}</span>
          </div>
          <div className="Movie__Synopsis">
            <LinesEllipsis
              text={this.props.movie.overview}
              maxLine='3'
              ellipsis='...'
              trimRight
              basedOn='letters'
            />
          </div>
          <div>
            <Modal isOpen={this.state.modal} toggle={this.toggle} size="lg">
              <ModalBody>
                <Card inverse>
                  <CardImg className="Card__Image" width="100%" src= {this.props.movie.backdrop_path === null ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" : `https://image.tmdb.org/t/p/original${this.props.movie.backdrop_path}`} alt="Card image cap" />
                  <CardImgOverlay>
                    <CardTitle className="text-body">{this.props.movie.title.toUpperCase()}</CardTitle>
                    <CardText className="text-black-50">{this.props.movie.tagline}</CardText>
                    <CardText className="text-body">{this.props.movie.overview}</CardText>
                    <CardText className="text-body">
                      <Table size="sm">
                        <thead>
                        <tr>
                          <th>Actors</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td>{this.props.movie.credits.cast.slice(0, 5).map((element, index) => {
                            if (index < this.props.movie.credits.cast.length - 1) {
                              return this.props.movie.credits.cast[index].name + ', '
                            } else {
                              return this.props.movie.credits.cast[index].name
                            }
                          })}</td>
                        </tr>
                        <tr>
                          <th>
                            Genres
                          </th>
                        </tr>
                        <tr>
                          <td>{this.props.movie.genres.slice(0, 5).map((element, index) => {
                            if (index < this.props.movie.genres.length - 1) {
                              return this.props.movie.genres[index].name + ', '
                            } else {
                              return this.props.movie.genres[index].name
                            }
                          })}</td>
                        </tr>
                        </tbody>
                      </Table>
                    </CardText>
                  </CardImgOverlay>
                </Card>
              </ModalBody>
            </Modal>
          </div>
        </div>
      </div>
    );
  }
}

export default MovieSlot;