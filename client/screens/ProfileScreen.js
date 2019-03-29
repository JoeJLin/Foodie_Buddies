import React, { Component } from "react";
import { Button, View, Text } from "react-native";
import axios from "axios";
import { API_PATH } from "../config/keys";

class ProfileScreen extends React.Component {
  // static navigationOptions = {
  //   title: "Welcome"
  // };
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
  }
  componentWillMount() {
    axios
      .get(`${API_PATH}/api`)
      .then(response => {
        this.setState({ name: response.data.name });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    // const { navigate } = this.props.navigation;
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Profile</Text>
      </View>
    );
  }
}

export default ProfileScreen;
