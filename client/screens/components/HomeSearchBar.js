import React, { Component } from "react";
import {
  Container,
  Header,
  Item,
  Input,
  Icon,
  Button,
  Text
} from "native-base";

export default class HomeSearchBar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <Header searchBar rounded style={{ padding: 0 }}>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Search"
            onChange={this.props.handleChange("keyword")}
            onSubmitEditing={this.props.submit}
            returnKeyType="search"
            value={this.props.keyword}
          />
          {/* <Icon name="ios-people" /> */}
        </Item>
        <Button transparent>
          <Text onSubmitEditing={this.props.submit}>Search</Text>
        </Button>
      </Header>
    );
  }
}
