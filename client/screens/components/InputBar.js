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

class InputBar extends Component {
  constructor() {
    super();
  }
  render() {
    return (
            <Form >
              <Item stackedLabel>
              <Icon active name="ios-brush" />
                <Input
                  placeholder="New Input"
                  onChange={this.props.handleChange("NewInput")}
                  onSubmitEditing={this.props.submit}
                  value={this.props.username}
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

export default InputBar;
