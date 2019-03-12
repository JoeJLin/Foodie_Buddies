import React, { Component } from "react";
import { Button } from "react-native";
import axios from "axios";
import { API_PATH } from "../config/keys";

class ProfileScreen extends React.Component {
  static navigationOptions = {
    title: "Welcome"
  };
    constructor(props) {
      super(props)
      this.state ={
        name: ""
      }
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
    const { navigate } = this.props.navigation;
    return (
      <Button
        title={this.state.name}
        onPress={() => navigate("Profile", { name: "Jane" })}
      />
    );
  }
}

export default ProfileScreen;
