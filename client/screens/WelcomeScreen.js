import React, { Component } from "react";
import { Button, View, Text } from "react-native";

class WelcomeScreen extends Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Button
          title="Login"
          onPress={() => this.props.navigation.navigate("Home")}
        />
        <Button title="Sign Up" onPress={() => alert("welcome")} />
      </View>
    );
  }
}

export default WelcomeScreen;
