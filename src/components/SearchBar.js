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

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.toggleDropDown = this.toggleDropDown.bind(this);
    this.toggleSplit = this.toggleSplit.bind(this);
    this.state = {
      dropDownOpen: false,
      splitButtonOpen: false
    };
  }

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

  state = {
    searchText: '',
  }

  onTextChange = (e, {value}) => {
    this.setState({searchText: value});
    this.props.onTextChange(value);
  }

  render() {
    let value = 'Search by...';
    const { searchText } = this.state;
    return(
      <InputGroup>
        <InputGroupButtonDropdown addonType="prepend" isOpen={this.state.splitButtonOpen} toggle={this.toggleSplit}>
          <DropdownToggle split outline />
          <DropdownMenu>
            <DropdownItem>By Title</DropdownItem>
            <DropdownItem>By Genre</DropdownItem>
            <DropdownItem>By Actor</DropdownItem>
          </DropdownMenu>
        </InputGroupButtonDropdown>
        <Input
          placeholder={value}
          // onChange={this.onTextChange}
          value={searchText}/>
        <InputGroupAddon addonType="append"><Button color="secondary">Search</Button></InputGroupAddon>
      </InputGroup>
    );
  }
}

export default SearchBar;