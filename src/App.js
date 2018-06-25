import React, { Component } from 'react';
import './App.css';
import SearchBar from "./components/SearchBar";

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <footer className="App-footer">
          <SearchBar className="SearchBar">
          </SearchBar>
        </footer>
      </div>
    );
  }
}

export default App;
