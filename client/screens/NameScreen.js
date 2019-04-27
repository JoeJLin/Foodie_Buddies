import React, { Component } from "react";
import { StyleSheet,Text} from 'react-native';
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
import InputBar from "./components/InputBar";
class NameScreen extends React.Component {
    constructor() {
        super();
        this.state = {
          username:"",
        };
      }
  
      handleChange = name => event => {
        console.log(event.nativeEvent.text);
        this.setState(
          {username: event.nativeEvent.text }
          // this.yelpApi(this.state.term)
        );
      };
      submitName = event => {
        console.log(event.nativeEvent.text);
        // this.setState(
        //     {newInput: event.nativeEvent.text }
        //     // this.yelpApi(this.state.term)
        //   );
          this.props.navigation.navigate('ProfileScreen', {
            username: this.state.username
          });
      };
    render() {
      return (
        <Form>
            <InputBar
            handleChange={event => this.handleChange(event)}
            username={this.state.username}
            submit={event => {
                this.submitName(event);
              }}
          />
        </Form>
      )
    }
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  }
});

export default NameScreen;
