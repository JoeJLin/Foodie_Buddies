import React, { Component } from "react";
import { View,AppRegistry, ScrollView, StyleSheet } from "react-native";
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
  Spinner,
  Icon,
  CardItem,
  Card
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
      <List style={{}}>
        {this.state.data.map((item, i) => {
          return <ChatRoom key={i} dataList={item} />;
        })}
      </List>
    </ScrollView>
    )
  const list2=(
    <Card>
      <CardItem>
      </CardItem>
      <CardItem style={{alignContent:'center',
      height:200}}>
        <Text style={{fontSize:16, fontFamily:"Chalkboard SE"}}>
        <Icon name="ios-hand" style={{ fontSize: 20, color: "black" }} />
        {" "}
        You didn't select any event!!! Go head and join some events
        </Text>
      </CardItem>
    </Card>
  )
    return (
      <Container>
        <Text style={{
          alignSelf:'center',
          paddingTop:60,
          fontFamily: "Cochin",
          fontWeight:'bold',
          fontSize:20}}>
            Selected Events
        </Text>
        {this.state.data.length !== 0 ? list : list2}
      
    </Container>
  );
  }
}

AppRegistry.registerComponent("IosFonts", () => IosFonts);
