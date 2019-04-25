import React, { Component } from "react";
import { StyleSheet } from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  ListItem,
  Button,
  Icon,
  Body,
  Left,
  Right
} from "native-base";

class SearchBar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
            <Form >
              <Item stackedLabel>
              <Icon active name="search" />
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

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  }
});

export default SearchBar;
