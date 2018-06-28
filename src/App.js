import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import AddMovieModal from "./components/AddMovieModal";
import MovieSlot from "./components/MovieSlot";

class App extends Component {

  state = {
    movies: [],
    numberOfMovies: 0,
    searchText: '',
    searchBy: 'title',
  };

  constructor(props) {
    super(props);

    let savedNumberOfMovies = parseInt(localStorage.getItem("Number_Of_Movies"));
    let {numberOfMovies, movies} = this.state;

    if (savedNumberOfMovies > 0) {

      this.state.numberOfMovies = savedNumberOfMovies;

      for (let i = 0; i < savedNumberOfMovies; i++) {

        let savedMovie = JSON.parse(localStorage.getItem(i.toString()));

        movies.push(savedMovie);
      }
    }
  }

  searchMovie = (searchText, searchBy) => {
    if (searchBy === 'title') {

      return this.searchByTitle.bind(this, searchText);

    } else if (searchBy === 'genre') {

      return this.searchByGenre.bind(this, searchText);

    } else {

      return this.searchByActor.bind(this, searchText);

    }
  };

  searchByTitle(searchText, movie) {
    return movie.title.toLowerCase().includes(searchText);
  }

  searchByGenre(searchText, movie) {
    return movie.genres.some((genre) => genre.name.toLowerCase().includes(searchText));
  }

  searchByActor(searchText, movie) {
    return movie.credits.cast.some((actor) => actor.name.toLowerCase().includes(searchText));
  }

  updateSearchBy = (searchCriteria) => {
    this.setState({searchBy:searchCriteria});
  };

  updateSearchText = (text) => {
    const newText = text.toLowerCase();
    this.setState({searchText:newText});
  };

  // Add newly added movie to the local storage, then increment the number of movies
  addNewMovie = () => {
    let {numberOfMovies, movies} = this.state;
    let newMovie = movies.slice(-1)[0];

    localStorage.setItem(numberOfMovies.toString(), JSON.stringify(newMovie));
    numberOfMovies += 1;
    localStorage.setItem("Number_Of_Movies", numberOfMovies);

    this.setState({ numberOfMovies : numberOfMovies });
  };

  // Render movie slots for each movie
  renderMovieSlot = (source) => {
    const moviesToDisplay = source.map(element => {
      return(
        <MovieSlot movie={element}/>
      )
    });
    return moviesToDisplay;
  };

  render() {
    let { movies, searchText, searchBy } = this.state;

    // Search by title/genres/actors
    if (searchText !== "") {

      movies = movies.filter(
        this.searchMovie(searchText, searchBy)
      );

    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Catalogue</h1>
          <div className="Add-movie-button">
            <AddMovieModal
              movies={movies}
              addNewMovie={this.addNewMovie}/>
          </div>
        </header>
        <div className="App-content">
          {this.renderMovieSlot(movies)}
        </div>
        <footer className="App-footer">
          <SearchBar
            className="SearchBar"
            updateSearchBy={this.updateSearchBy}
            updateSearchText={this.updateSearchText}>
          </SearchBar>
        </footer>
      </div>
    );
  }
}

export default App;
