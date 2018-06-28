import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Input, FormFeedback, Table
} from 'reactstrap';
import PropTypes from "prop-types";

class AddMovieModal extends Component {
  static propTypes = {
    movies: PropTypes.arrayOf(PropTypes.shape).isRequired,
    addNewMovie: PropTypes.func.isRequired,
  };

  static defaultProps = {
    movies: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      addNewMovie: false,
      results: [],
      selectedMovie: null,
    };

    this.toggle = this.toggle.bind(this);
    this.addMovie = this.addMovie.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
  }

  toggle() {
    this.setState({
      addNewMovie: !this.state.addNewMovie,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  updateSearchResult() {
    let val = document.getElementById('searchInput').value;

    const key = 'ed7838206772925308953af2b2162f01';

    if (val !== '') {
      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${val}&page=1&include_adult=false`)
        .then(response => {
          if (response.status !== 200) {
            console.log('Error: ' + response.status);
            return;
          }

          response.json().then(data => {
            const results = data.results;
            this.setState({ results });
          });
        })

        .catch(err => {
          console.log('Fetch Error :-S', err);
        })
    }
  }

  getMovieDetail(movieId) {
    console.log("Getting Data");
    const key = 'ed7838206772925308953af2b2162f01';

    fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${key}&language=en-US&append_to_response=credits`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }

        response.json().then(data => {
          const movie = data;
          this.setState({ selectedMovie:movie});
        });

      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      })
  }

  addMovie() {
    console.log("Adding this");
    console.log(this.state.selectedMovie);
    this.props.movies.push(this.state.selectedMovie);
    this.props.addNewMovie();

    document.getElementById('searchInput').value = '';

    this.state.results = [];
    this.state.selectedMovie = null;
    this.toggle();
  }

  getMoviePreview(movieId) {
    this.getMovieDetail(movieId);
  }

  renderPreviewMovie() {
    if (this.state.selectedMovie !== null) {
      return(
        <p>
          {this.state.selectedMovie.title}
          {this.state.selectedMovie.release_date}
        </p>
      )
    } else {
      return
    }
  }

  render() {
    return (
      <div>
        <Button color="secondary" size="lg" onClick={this.toggle}>Add New Movie</Button>
        <Modal isOpen={this.state.addNewMovie} toggle={this.toggle}>
          <ModalHeader toggle={this.toggle}>Add a movie to your catalogue</ModalHeader>
          <ModalBody>
            <form onSubmit={this.handleSubmit} id="form">
              <InputGroup>
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>Title</InputGroupText>
                </InputGroupAddon>
                <Input id="searchInput" onKeyUp={this.updateSearchResult}/>
                <FormFeedback>Title needs to filled in.</FormFeedback>
              </InputGroup>
              <br/>
              <Table hover id="results">
                <thead>
                <tr>
                  <th>Title</th>
                  <th>Release Date</th>
                </tr>
                </thead>
                <tbody>
                {this.state.results.map((element, index) => {
                    return(
                      <tr onClick={() => this.getMoviePreview(this.state.results[index].id)} >
                        <td>{this.state.results[index].title}</td>
                        <td>{this.state.results[index].release_date}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </Table>
            </form>
            {this.renderPreviewMovie()}
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={this.addMovie} disabled={this.state.selectedMovie === null}>Add</Button>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddMovieModal;