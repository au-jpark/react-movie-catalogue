import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import AddMovieModal from "./components/AddMovieModal";
import MovieSlot from "./components/MovieSlot";

class App extends Component {

  state = {
    movieIds: [],
    movies: [],
    numberOfMovies: 0,
    searchText: '',
    searchBy: 'title',
  };

  constructor(props) {
    super(props);

    let savedNumberOfMovies = parseInt(localStorage.getItem("Number_Of_Movies"));
    let {movieIds, numberOfMovies} = this.state;
    if (savedNumberOfMovies > 0) {
      this.state.numberOfMovies = savedNumberOfMovies;
      for (var i = 0; i < savedNumberOfMovies; i++) {
        let savedMovieId = localStorage.getItem(i.toString());
        this.getData(savedMovieId);
        movieIds.push(savedMovieId);
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
    return movie.actors.some((actor) => actor.name.toLowerCase().includes(searchText));
  }

  updateSearchBy = (searchCriteria) => {
    this.setState({searchBy:searchCriteria});
  };

  updateSearchText = (text) => {
    const newText = text.toLowerCase();
    this.setState({searchText:newText});
  };

  addNewMovie = () => {
    let {numberOfMovies, movieIds} = this.state;
    let newMovie = movieIds.slice(-1)[0];
    localStorage.setItem(numberOfMovies.toString(), newMovie);
    numberOfMovies += 1;
    localStorage.setItem("Number_Of_Movies", numberOfMovies);
    this.setState({ numberOfMovies:numberOfMovies});

    this.getData(newMovie);
  };

  getData(movieIdToDisplay) {
    console.log("Getting Data");
    const key = 'ed7838206772925308953af2b2162f01';

    fetch(`https://api.themoviedb.org/3/movie/${movieIdToDisplay}?api_key=${key}&language=en-US&append_to_response=credits`)
      .then(response => {
        if (response.status !== 200) {
          console.log('Error: ' + response.status);
          return;
        }

        response.json().then(data => {
          const movie = data;
          const newMovie = {
            id: movie.id,
            title: movie.title,
            actors: movie.credits.cast.slice(0, 3),
            genres: movie.genres.slice(0,3),
          };
          if (this.state.movies.length !== this.state.numberOfMovies) {
            this.state.movies.push(newMovie);
          }
        });

      })
      .catch(err => {
        console.log('Fetch Error :-S', err);
      })
  }

  renderMovieSlot = (source) => {
    const moviesToDisplay = source.map(element => {
      if (this.state.searchText !== "") {
        return(
          <MovieSlot movieId={element.id}/>
        )
      } else {
        return(
          <MovieSlot movieId={element}/>
        )
      }
    });
    return moviesToDisplay;
  };

  render() {
    let { movieIds, movies, searchText, searchBy } = this.state;

    let renderingSource = movieIds;
    // Search by title/genres/actors
    if (searchText !== "") {
      movies = movies.filter(
        this.searchMovie(searchText, searchBy)
      );
      renderingSource = movies;
    }

    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Catalogue</h1>
          <AddMovieModal
            movieIds={movieIds}
            addNewMovie={this.addNewMovie}/>
        </header>
        <div className="App-content">
          {this.renderMovieSlot(renderingSource)}
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
