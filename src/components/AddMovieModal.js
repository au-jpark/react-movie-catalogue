import React, { Component } from 'react';
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

class AddMovieModal extends Component {
  static propTypes = {
    movieIds: PropTypes.arrayOf(PropTypes.string).isRequired,
    addNewMovie: PropTypes.func.isRequired,
  };

  static defaultProps = {
    movieIds: [],
  };

  constructor(props) {
    super(props);
    this.state = {
      addNewMovie: false,
      results: [],
    };

    this.toggle = this.toggle.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
  }

  toggle() {
    this.setState({
      addNewMovie: !this.state.addNewMovie
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  updateSearchResult() {
    document.getElementById('results').className = 'formResults';
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

  addMovieId(movieId) {
    this.props.movieIds.push(movieId.toString());
    this.props.addNewMovie();
    document.getElementById('searchInput').value = '';
    this.state.results = [];
    this.toggle();
  };

  render() {
    return (
      <div>
        <Button color="secondary" size="lg" onClick={this.toggle}>Add New Movie</Button>
        <Modal isOpen={this.state.addNewMovie} toggle={this.toggle} className={this.props.className}>
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
              <ul id="results">
                {this.state.results.map((element, index) => {
                  return(
                    <div onClick={() => this.addMovieId(this.state.results[index].id)}>
                      <p>{this.state.results[index].title}</p>
                      <p>{this.state.results[index].release_date}</p>
                    </div>
                  )
                })}
              </ul>
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>Cancel</Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default AddMovieModal;