import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import NavigationScreen from "./NavigationScreen";

class HomeScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Welcome"
  // };
  render() {
    // const { navigate } = this.props.navigation;
    return (
      // <Button
      //   title="Home"
      //   onPress={() => navigate("Profile", { name: "Jane" })}
      // />
      // <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <NavigationScreen />
      // {/* </View> */}
    );
  }
}

export default HomeScreen;
