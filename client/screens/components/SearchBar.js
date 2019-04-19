import React, { Component } from "react";
import { Container, Header, Content, Form, Item, Input } from "native-base";
// import { API_PATH } from "../../config/keys";
import axios from "axios";

class SearchBar extends Component {
  render() {
    return (
      <Header>
        <Content>
          <Form>
            <Item>
              <Input placeholder="Username" />
            </Item>
            <Item last>
              <Input placeholder="Password" />
            </Item>
          </Form>
        </Content>
      </Header>
    );
  }
}

export default SearchBar;
