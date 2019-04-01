import React, { Component } from "react";
import { Button, View, Text, AsyncStorage } from "react-native";

class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userToken: ""
    };
  }

  async componentDidMount() {
    const userToken = await AsyncStorage.getItem("userToken");
    this.setState({ userToken });
    console.log("userToken", userToken);
  }

  signOut = async () => {
    await AsyncStorage.removeItem("userToken");
    console.log("log out");
    this.props.navigation.navigate("Auth");
  };

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.userToken}</Text>
        <Button onPress={() => this.signOut()} title="Sign Out" />
      </View>
    );
  }
}

export default Setting;
