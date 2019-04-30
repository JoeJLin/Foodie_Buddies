import React, { Component } from "react";
import { withNavigation } from "react-navigation";
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
  Right,
  Spinner,
  List,
  ListItem,
  Image
} from "native-base";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { API_PATH } from "../config/keys";

class RoomDetailScreen extends Component {
  constructor() {
    super();
  }

  selectRoom = () => {
    const { room, place, host } = this.props.navigation.state.params.data;
    console.log("select this room " + room.id);
    AsyncStorage.getItem("userId", (err, userId) => {
      if (err) {
        console.log(err);
        return;
      }
      axios
        .post(`${API_PATH}/user/addRoom`, { roomId: room.id, userId })
        .then(result => {
          console.log(result.data);
        })
        .catch(err => {
          console.log(err);
        });
    });
  };

  render() {
    const { room, place, host } = this.props.navigation.state.params.data;
    return (
      <Container>
        <Card>
          <CardItem header>
            <Thumbnail source={{ uri: place.image_url }} />

            <Text>
              Event name: {room.name}
              {"\n"}
              Event At: {place.name}
              {"\n"}
              Host by: {host.name}
            </Text>
          </CardItem>
          <CardItem>
            <Body>
              <Text>
                Address:{" "}
                {place.location.display_address[0] +
                  place.location.display_address[1]}
              </Text>
              <Text>
                Date: {room.date}
                {"\n"}
                Time: {room.time}
              </Text>
              <Text>Size: {room.size}</Text>
            </Body>
          </CardItem>
          <CardItem style={{ alignSelf: "center" }}>
            <Button
              onPress={() => {
                this.selectRoom();
              }}
            >
              <Text>Select</Text>
            </Button>
          </CardItem>
        </Card>
      </Container>
    );
  }
}

export default withNavigation(RoomDetailScreen);
