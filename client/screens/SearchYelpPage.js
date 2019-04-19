import React, { Component } from "react";
import { Container } from "native-base";
import SearchBar from "./components/SearchBar";

export default class SearchYelpPage extends Component {
  render() {
    return (
      <Container>
        <SearchBar />
      </Container>
    );
  }
}
