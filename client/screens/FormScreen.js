import React, { Component } from "react";
import { Button, View, Text } from "react-native";

class FormScreen extends React.Component {
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
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>From</Text>
      </View>
    );
  }
}

export default FormScreen ;
