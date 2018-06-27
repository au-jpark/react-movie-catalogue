import React, { Component } from 'react';

class APISearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: []
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.updateSearchResult = this.updateSearchResult.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
  }

  updateSearchResult() {
    document.getElementById('results').className = 'formResults';
    let val = document.getElementById('searchInput').value;

    if (val === '') {
      document.getElementById('results').className = 'noDisplay';
    }

    const key = 'ed7838206772925308953af2b2162f01';

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

  addMovieId(movieId) {
    this.props.movieIds.push(movieId);
    document.getElementById('searchInput').value = '';
  };

  render() {
    return(
      <form onSubmit={this.handleSubmit} id="form">
        <input onKeyUp={this.updateSearchResult} id="searchInput" className="searchBar" type="text" placeholder="Search a movie" required />
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
    );
  }
}

export default APISearchBar;