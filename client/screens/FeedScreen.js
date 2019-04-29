import React, { Component } from "react";
import { View, TouchableOpacity, style } from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text
} from "native-base";
import NavigationScreen from "./NavigationScreen";
import axios from "axios";
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";

class Feed extends React.Component {
  constructor() {
    super();
    // this.state = {
    //   data: []
    // };
  }

  componentDidMount() {
    AsyncStorage.multiGet(["latitude", "longitude"], (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      axios
        .get(`${API_PATH}?latitude=${results[0][1]}&longitude=${results[1][1]}`)
        .then(places => {
          console.log(places);
        })
        .catch(err => {
          console.log(err);
        });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    // const list =
    // <
    return (
      <View>
        <NavigationScreen />
        {/* {this.state.data? :null} */}
        <Button rounded info onPress={() => navigate("Form", { name: "form" })}>
          <Text>Create</Text>
        </Button>
      </View>
    );
  }
}

export default Feed;
