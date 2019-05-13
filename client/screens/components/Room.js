import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Button,
  Icon,
  Left,
  Body,
  ListItem,
  Right
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import {
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Text
} from "react-native";
import errorPic from "../../assets/404.png";
import { withNavigation } from "react-navigation";
import CheckRoom from "./CheckRoom";

class Room extends Component {
  constructor() {
    super();
    this._onPressAdd = this._onPressAdd.bind(this);
    this._CallOn = this._CallOn.bind(this);
  }
  _onPressAdd() {
    this.refs.checkRoom.showAddModal();
  }
  _CallOn() {
    this.props.navigation.navigate("RoomDetail", {
      data: this.props.dataList,
      goBackKey: this.props.navigation.state.key
    });
  }
  render() {
     console.log(this.props.dataList)
    //console.log(this.props.navigation);
    return (
      <ListItem avatar style={{}}>
        <Left>
          <Thumbnail
            square
            large
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
        <Right style={{ paddingTop: 35 }}>
          <Button transparent>
            <Text
              note
              style={{ fontSize: 16, color: "black" }}
              onPress={() => {
                {
                  this.props.dataList.room.isPrivate
                    ? this._onPressAdd()
                    : this._CallOn();
                }
              }}
            >
              More
            </Text>
            <Icon
              name="ios-arrow-forward"
              style={{ fontSize: 25, color: "black" }}
            />
          </Button>
        </Right>
        <CheckRoom
          ref={"checkRoom"}
          rightCode={this.props.dataList.room.roomCode}
          data={this.props.dataList}
          goBackKey={this.props.navigation.state.key}
          _CallOn={this._CallOn}
        />
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

export default withNavigation(Room);
