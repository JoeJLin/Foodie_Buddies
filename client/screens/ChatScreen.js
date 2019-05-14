import React, { Component } from "react";
import { AppRegistry, ScrollView, StyleSheet } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  List,
  Spinner
} from "native-base";
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";
import axios from "axios";

styles = StyleSheet.create({
  scroller: {
    flex: 1
  }
});

export default class IosFonts extends Component {
  constructor() {
    super();
    this.state = {
      data: null
    };
  }
  componentDidMount() {
    console.log("in did mount");
    AsyncStorage.getItem("userId", (err, userId) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("userId", userId);
      axios
        .get(`${API_PATH}/room/getRoomList?userId=${userId}`)
        .then(result => {
          console.log(result.data);
          this.setState({ data: result.data });
        })
        .catch(err => {
          console.log("in error", err);
        });
    });
  }
  render() {
    return (
      <ScrollView style={styles.scroller}>
         <Text>
            Hello
          </Text>
      </ScrollView>
    );
  }
}

AppRegistry.registerComponent("IosFonts", () => IosFonts);
