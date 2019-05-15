import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Icon,
  Left,
  Body,
  ListItem,
  Right
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import{
  AppRegistry, StyleSheet, Text, View, Image, Alert,
  Platform, TouchableHighlight, Dimensions, TextInput
} from 'react-native';
import errorPic from "../../assets/404.png";
import Modal from 'react-native-modalbox';
import Button from 'react-native-button';
import { withNavigation } from "react-navigation";

var screen = Dimensions.get('window');
class ChatRoom extends Component {
  constructor() {
    super();
    this.state={
      Code:" "
  };
  }
  render() {
     console.log(this.props.dataList)
    //console.log(this.props.navigation);
    return (
      <ListItem avatar style={{}}>
        <Left>
          <Thumbnail
            source={{
              uri: this.props.dataList.place.image_url
                ? this.props.dataList.place.image_url
                : "../../assets/404.png"
            }}
            style={{
              alignSelf: "center",
              width: 130,
              height: 120
            }}
          />
        </Left>
        <Body>
          <Text style={styles.title}>
            Event Name: {this.props.dataList.room.name}
          </Text>
          <Text />
          <Text note style={styles.wording}>
            <Icon
              name="ios-backspace"
              style={{ fontSize: 20, color: "orange" }}
            />{" "}
            {this.props.dataList.place.categories[0]["alias"]}
          </Text>
          <Text note style={styles.wording}>
            <Icon
              name="ios-calendar"
              style={{ fontSize: 20, color: "black" }}
            />{" "}
            {this.props.dataList.room.date}
          </Text>
          <Text note style={styles.wording}>
            <Icon name="ios-time" style={{ fontSize: 20, color: "black" }} />{" "}
            {this.props.dataList.room.time}
          </Text>
        </Body>
        <Right style={{}}>
        <Icon name="ios-star" style={{ fontSize: 20, color: "orange" }} />
        </Right>
      </ListItem>
    );
  }
}

const styles = StyleSheet.create({
  mb10: {
    marginBottom: 10
  },
  mb35: {
    marginBottom: 35
  },
  container: {
    //height:150
  },
  wording: {
    fontSize: 16,
    color: "black",
    fontFamily: "Avenir-Book"
  },
  title: {
    paddingTop: 10,
    alignSelf: "flex-start",
    fontSize: 20,
    fontFamily: "Cochin"
  }
});

export default withNavigation(ChatRoom);
