import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  ListItem
} from "native-base";

class SearchBar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Form>
        <Item stackedLabel>
          <Input
            placeholder="Search places"
            onChange={this.props.handleChange("term")}
            onSubmitEditing={this.props.submit}
            returnKeyType="search"
            value={this.props.term}
          />
        </Item>
        <Item stackedLabel>
          <Input
            placeholder="Enter city name or zip code"
            onChange={this.props.handleChange("location")}
            onSubmitEditing={this.props.submit}
            returnKeyType="search"
            value={this.props.location}
          />
        </Item>
      </Form>
    );
  }
}

export default SearchBar;
