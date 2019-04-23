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

class Feed extends React.Component {
  render() {
    const { navigate } = this.props.navigation;

    return (
      <View>
        <NavigationScreen />
        <Button rounded info onPress={() => navigate("Form", { name: "form" })}>
          <Text>Create</Text>
        </Button>
      </View>
    );
  }
}

export default Feed;
