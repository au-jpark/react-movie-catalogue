import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";
import MovieSlot from "./components/MovieSlot";

class App extends Component {

  state = {};

  componentWillMount() {
    const movies = [
      {
        title_english: "Snowpiercer",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/Snowpiercer_2013\\/large-cover.jpg",
        id: "",
        genres: ["Action","Adventure","Sci-Fi","Thriller"],
        synopsis: ""
      },
      {
        title_english: "Avengers",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/avengers_age_of_ultron_2015\\/large-cover.jpg",
        id: "",
        genres: ["Action","Adventure","Sci-Fi","Thriller"],
        synopsis: ""
      },
      {
        title_english: "Captain America",
        large_cover_image: "https:\\/\\/yts.am\\/assets\\/images\\/movies\\/Captain_America_The_Winter_Soldier_2014\\/large-cover.jpg",
        id: "",
        genres: ["Action","Adventure","Sci-Fi","Thriller"],
        synopsis: ""
      }
    ];
    this.setState({
      movies
    });
  }

  renderMovieSlot = () => {
    const movies = this.state.movies.map(movie => {
      return (
        <MovieSlot
          title={movie.title_english}
          poster={movie.large_cover_image}
          key={movie.id}
          genres={movie.genres}
          synopsis={movie.synopsis}
        />
      );
    });
    return movies;
  };

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Movie Catalogue</h1>
        </header>
        <div className="App-content">
          {this.renderMovieSlot()}
        </div>
        <footer className="App-footer">
          <SearchBar className="SearchBar">
          </SearchBar>
        </footer>
      </div>
    );
  }
}

export default App;
