import React, { Component } from "react";
import { AppRegistry, ScrollView, StyleSheet } from "react-native";
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
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";
import axios from "axios";
import ChatRoom from "./components/ChatRoom"
styles = StyleSheet.create({
  scroller: {
    flex: 1
  }
});

export default class IosFonts extends Component {
  constructor() {
    super();
    this.state = {
      data:[]
    };
  }
  componentDidMount() {
    console.log("in did mount");
    AsyncStorage.getItem("userId", (err, userId) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("userId", userId);
      axios
        .get(`${API_PATH}/room/getRoomList?userId=${userId}`)
        .then(result => {
          console.log("Chat")
          console.log(result.data);
          this.setState({ data: result.data });
        })
        .catch(err => {
          console.log("in error", err);
        });
    });
  }
  render() {
    const list =(
      <ScrollView>
      <List>
        {this.state.data.map((item, i) => {
          return <ChatRoom key={i} dataList={item} />;
        })}
      </List>
    </ScrollView>
    )
    return (
      <Container>
     
        {this.state.data.length !== 0 ? list : <Spinner color="blue" />}
      
    </Container>
  );
  }
}

AppRegistry.registerComponent("IosFonts", () => IosFonts);
