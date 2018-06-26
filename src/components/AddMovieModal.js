import React from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Input, FormFeedback
} from 'reactstrap';
import PropTypes from "prop-types";

class AddMovieModal extends React.Component {
  static propTypes = {
    movieList: PropTypes.arrayOf(PropTypes.shape({
      title: PropTypes.string.isRequired,
      image: PropTypes.string,
      genres: PropTypes.arrayOf(PropTypes.string),
      actors: PropTypes.arrayOf(PropTypes.string),
      synopsis: PropTypes.string
    })),
    addNewMovie: PropTypes.func.isRequired,
  };

  static defaultProps = {
    movieList: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      addNewMovie: false,

      newMovieTitle: "",
      newMovieImage: "",
      newMovieGenres: "",
      newMovieActors: "",
      newMovieSynopsis: "",
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({
      addNewMovie: !this.state.addNewMovie
    });
  }

  addMovie = () => {
    const {
      newMovieTitle, newMovieImage, newMovieGenres, newMovieActors, newMovieSynopsis,
    } = this.state;
    this.setState({
      addNewMovie: !this.state.addNewMovie
    });
    let newMovie = {
      title_english: newMovieTitle,
      large_cover_image: newMovieImage,
      id: "",
      genres: (
        newMovieGenres
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "")
      ),
      actors: (
        newMovieActors
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s !== "")
      ),
      synopsis: newMovieSynopsis
    };
    this.props.movieList.push(newMovie);
    this.props.addNewMovie();
  };

  getUserInput = (name, value) => {
    this.setState({[name]:value});
  };

  render() {
    let isTitleEmpty = this.state.newMovieTitle === "";
    return (
      <div>
        <Button color="secondary" size="lg" onClick={this.toggle}>Add New Movie</Button>
        <Modal isOpen={this.state.addNewMovie} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Add a movie to your catalogue</ModalHeader>
          <ModalBody>
            <div>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Title</InputGroupText>
                </InputGroupAddon>
                <Input invalid={isTitleEmpty} onChange={(e) => this.getUserInput("newMovieTitle", e.target.value)}/>
                <FormFeedback>Title needs to filled in.</FormFeedback>
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Genre</InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => this.getUserInput("newMovieGenres", e.target.value)}/>
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Actors</InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => this.getUserInput("newMovieActors", e.target.value)}/>
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Synopsis</InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => this.getUserInput("newMovieSynopsis", e.target.value)}/>
              </InputGroup>
              <br/>
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Poster Image</InputGroupText>
                </InputGroupAddon>
                <Input onChange={(e) => this.getUserInput("newMovieImage", e.target.value)}/>
              </InputGroup>
              <br />
            </div>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" disabled={isTitleEmpty} onClick={this.addMovie}>Add to the List!</Button>{' '}
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddMovieModal;