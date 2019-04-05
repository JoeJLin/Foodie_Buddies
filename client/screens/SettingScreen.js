import React, { Component } from "react";
import { Button, View, Text, AsyncStorage } from "react-native";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem("userId");
    this.setState({ userId });
    console.log("userId", userId);
  }

  signOut = async () => {
    await AsyncStorage.removeItem("userId");
    console.log("log out");
    console.log("aosnfoinaoisnfoiasndonafsnoini")
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.userId}</Text>
        <Button onPress={() => this.signOut()} title="Sign Out" />
      </View>
    );
  }
}

export default Setting;
