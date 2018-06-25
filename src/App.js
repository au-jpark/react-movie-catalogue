import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import MovieSlot from "./components/MovieSlot";

class App extends Component {

  state = {
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

  componentWillMount() {
    const movies = [
      {
        title_english: "Snowpiercer",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/Snowpiercer_2013\\/large-cover.jpg",
        id: "",
        genres: ["Adventure","Sci-Fi"],
        actors: ["a", "b"],
        synopsis: ""
      },
      {
        title_english: "Avengers",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/avengers_age_of_ultron_2015\\/large-cover.jpg",
        id: "",
        genres: ["Action","Adventure"],
        actors: ["c, d"],
        synopsis: ""
      },
      {
        title_english: "Captain America",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/Captain_America_The_Winter_Soldier_2014\\/large-cover.jpg",
        id: "",
        genres: ["Thriller"],
        actors: ["a", "d"],
        synopsis: ""
      }
    ];

    this.setState({
      movies
    });
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
