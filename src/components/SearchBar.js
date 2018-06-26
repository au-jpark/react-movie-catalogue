import React, { Component } from 'react';

import {
  Button,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Input,
  InputGroup, InputGroupAddon,
  InputGroupButtonDropdown,
} from 'reactstrap';
import PropTypes from "prop-types";

class SearchBar extends Component {
  static propTypes = {
    updateSearchBy: PropTypes.func.isRequired,
    updateSearchText: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropDownOpen: false,
      splitButtonOpen: false,
      searchText: '',
      searchBy: 'title'
    };
  }

  updateSearchByToTitle = () => {
    this.setState({searchBy: 'title'});
    this.props.updateSearchBy('title');
  };

  updateSearchByToGenre = () => {
    this.setState({searchBy: 'genre'});
    this.props.updateSearchBy('genre');
  };

  updateSearchByToActor = () => {
    this.setState({searchBy: 'actor'});
    this.props.updateSearchBy('actor');
  };

  updateSearchText = (e) => {
    this.setState({searchText: e.target.value});
    this.props.updateSearchText(e.target.value);
  };

  toggleDropDown() {
    this.setState({
      dropDownOpen: !this.state.dropDownOpen
    });
  }

  toggleSplit() {
    this.setState({
      splitButtonOpen: !this.state.splitButtonOpen
    });
  }

  render() {
    const { searchText, searchBy } = this.state;
    let value = 'Search by ' + searchBy;
    return(
      <InputGroup>
        <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
          <DropdownToggle split outline />
          <DropdownMenu>
            <DropdownItem onClick={this.updateSearchByToTitle}>By Title</DropdownItem>
            <DropdownItem onClick={this.updateSearchByToGenre}>By Genre</DropdownItem>
            <DropdownItem onClick={this.updateSearchByToActor}>By Actor</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input
          placeholder={value}
          onChange={this.updateSearchText}
          value={searchText}/>
        <InputGroupAddon addonType="append"><Button color="secondary">Search</Button></InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchBar;