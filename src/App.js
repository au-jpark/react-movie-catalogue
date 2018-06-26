import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import MovieSlot from "./components/MovieSlot";
import AddMovieModal from "./components/AddMovieModal";

class App extends Component {

  state = {
    movies: [],
    movieId: 0,
    searchText: '',
    searchBy: 'title',
  };

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
    return movie.title_english.toLowerCase().includes(searchText);
  }

  searchByGenre(searchText, movie) {
    return movie.genres.some((genre) => genre.toLowerCase().includes(searchText));
  }

  searchByActor(searchText, movie) {
    return movie.actors.some((actor) => actor.toLowerCase().includes(searchText));
  }

  updateSearchBy = (searchCriteria) => {
    this.setState({searchBy:searchCriteria});
  };

  updateSearchText = (text) => {
    const newText = text.toLowerCase();
    this.setState({searchText:newText});
  };

  addNewMovie = () => {
    let {movies, movieId} = this.state;
    let newMovie = movies.slice(-1)[0];
    localStorage.setItem(movieId.toString(), JSON.stringify(newMovie));
    movieId += 1;
    localStorage.setItem("Movie_Id", movieId);
    this.setState({movieId:movieId});
  };

  componentWillMount() {
    let movieId = parseInt(localStorage.getItem("Movie_Id"));
    let {movies} = this.state;
    if (movieId > 0) {
      for (var i = 0; i < movieId; i++) {
        let savedMovie = localStorage.getItem(i.toString());
        movies.push(JSON.parse(savedMovie));
      }
      this.setState({
        movieId: movieId
      });
    }
  }

  renderMovieSlot = (movies) => {
    const moviesToDisplay = movies.map(movie => {
      return (
        <MovieSlot
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          actors={movie.actors}
          synopsis={movie.synopsis}
        />
      );
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
          <AddMovieModal
            movieList={movies}
            addNewMovie={this.addNewMovie}/>
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
