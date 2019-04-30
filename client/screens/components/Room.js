import React, { Component } from "react";
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Thumbnail,
  Text,
  Button,
  Icon,
  Left,
  Body,
  ListItem,
  Right
} from "native-base";
import errorPic from "../../assets/404.png";
import { withNavigation } from "react-navigation";

class Room extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <ListItem avatar>
        <Left>
          <Thumbnail
            large
            source={{
              uri: this.props.dataList.place.image_url
                ? this.props.dataList.place.image_url
                : "../../assets/404.png"
            }}
          />
        </Left>
        <Body>
          <Text>Event Name: {this.props.dataList.room.name}</Text>

          <Text note style={{ fontSize: 16, color: "black" }}>
            <Icon name="ios-navigate" style={{ fontSize: 25 }} />
            At: {this.props.dataList.place.name}
          </Text>
          <Text note style={{ fontSize: 16, color: "black" }}>
            <Icon name="ios-flame" style={{ fontSize: 25, color: "red" }} />
            Rating: {this.props.dataList.place.rating}
            <Icon name="ios-star" style={{ fontSize: 25, color: "orange" }} />
            Price: {this.props.dataList.place.price}
          </Text>
        </Body>

        <Right>
          {this.props.dataList.room.isPrivate ? (
            <Text>Private</Text>
          ) : (
            <Text>Public</Text>
          )}
          <Button transparent>
            <Text
              note
              style={{ fontSize: 16, color: "black" }}
              onPress={() => {
                this.props.navigation.navigate("RoomDetail", {
                  data: this.props.dataList,
                  goBackKey: this.props.navigation.state.key
                });
              }}
            >
              View
            </Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default withNavigation(Room);
