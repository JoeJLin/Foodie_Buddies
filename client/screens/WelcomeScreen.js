import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  AsyncStorage,
  ActivityIndicator,
  StatusBar
} from "react-native";

class WelcomeScreen extends Component {
  constructor(props) {
    super(props);
    this.checkUserToken();
  }

  checkUserToken = async () => {
    const userToken = await AsyncStorage.getItem("UserToken");

    this.props.navigation.navigate(userToken ? "Home" : "Auth");
  };

  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

export default WelcomeScreen;
