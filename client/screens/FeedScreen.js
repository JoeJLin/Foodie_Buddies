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
  Text,
  List,
  Spinner
} from "native-base";
import NavigationScreen from "./NavigationScreen";
import Room from "./components/Room";
import axios from "axios";
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(["latitude", "longitude"], (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      // console.log(results);
      console.log("in  adsfasdf");
      axios
        .get(
          `${API_PATH}/room?latitude=${results[0][1]}&longitude=${
            results[1][1]
          }`
        )
        .then(places => {
          console.log("in placesss");
          // console.log("place", places.data);
          this.setState({ data: places.data });
        })
        .catch(err => {
          console.log("err", err);
        });
    });
  }

  render() {
    const { navigate } = this.props.navigation;
    const list = (
      <List>
        {this.state.data.map((item, i) => {
          return <Room key={i} dataList={item} />;
        })}
      </List>
    );
    return (
      <Container>
        <NavigationScreen />
        {this.state.data.length !== 0 ? list : <Spinner color="blue" />}
        <Button
          rounded
          info
          onPress={() => navigate("Form", { name: "form" })}
          style={{ position: "absolute", top: "87%", right: 20 }}
        >
          <Text>+</Text>
        </Button>
      </Container>
    );
  }
}

export default Feed;
