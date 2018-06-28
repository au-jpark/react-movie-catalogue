import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  InputGroup,
  InputGroupAddon,
  InputGroupText, Input, FormFeedback, Table, Card, CardBody, CardTitle, CardText
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
      searching: false,
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
      results : [],
      selectedMovie : null,
      searching : false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
  }


  // Contact TMDB to get a list of movie Ids that corresponds with the given movie title
  updateSearchResult() {
    const key = 'ed7838206772925308953af2b2162f01';
    let val = document.getElementById('searchInput').value;

    if (val !== '') {
      this.setState({ searching : true });

      fetch(`https://api.themoviedb.org/3/search/movie?api_key=${key}&language=en-US&query=${val}&page=1&include_adult=false`)
        .then(response => {
          if (response.status !== 200) {
            console.log('Error: ' + response.status);
            return;
          }

          response.json().then(data => {
            const results = data.results.slice(0, 5);
            this.setState({ results });
          });
        })

        .catch(err => {
          console.log('Fetch Error', err);
        })
    } else {
      this.setState({
        searching : false,
        selectedMovie: null,
      });
    }
  }

  // Contact TMDB to get detailed information for a given movie Id
  getMovieDetail(movieId) {
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
        console.log('Fetch Error', err);
      })
  }

  addMovie() {
    this.props.movies.push(this.state.selectedMovie);
    this.props.addNewMovie();

    document.getElementById('searchInput').value = '';

    this.toggle();
  }

  getMoviePreview(movieId) {
    this.getMovieDetail(movieId);
  }

  renderPreviewMovie() {
    if (this.state.selectedMovie !== null) {

      return(
        <Card>
          <CardBody>
            <CardTitle>{this.state.selectedMovie.title}</CardTitle>
          </CardBody>
          <img width="100%" src= {this.state.selectedMovie.backdrop_path === null ? "https://placeholdit.imgix.net/~text?txtsize=33&txt=318%C3%97270&w=318&h=270&bg=333333&txtclr=666666" : `https://image.tmdb.org/t/p/original${this.state.selectedMovie.backdrop_path}`} alt="Card image cap" />
          <CardBody>
            <CardText>{this.state.selectedMovie.tagline}</CardText>
          </CardBody>
        </Card>
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
                <Input id="searchInput" onKeyUp={this.updateSearchResult} placeholder="Search for a movie"/>
                <FormFeedback>Title needs to filled in.</FormFeedback>
              </InputGroup>
              <br/>
              <div className="resultTable" hidden={!this.state.searching}>
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
              </div>
            </form>
            <div>
              {this.renderPreviewMovie()}
            </div>

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