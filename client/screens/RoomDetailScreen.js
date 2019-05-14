import React, { Component } from "react";
import { StyleSheet, Image, Dimensions } from "react-native";
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
} from "native-base";
import { AsyncStorage } from "react-native";
import axios from "axios";
import { API_PATH } from "../config/keys";

const deviceWidth = Dimensions.get("window").width;

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
      <Container style={styles.container}>
        <Content padder>
          <Card style={styles.mb}>
            <CardItem bordered>
              <Left>
                <Thumbnail 
                square
                source={{uri:host.photoUrl}} />
                <Body>
                  <Text style={styles.title}>Event's name : {room.name}</Text>
                  <Text style={styles.title}>Host by: {host.name}</Text>
                  <Text note >{room.date}</Text>
                  <Text note >{room.time}</Text>
                </Body>
              </Left>
            </CardItem>

            <CardItem bordered>
              <Body>
                <Image
                  style={{
                    alignSelf: "center",
                    height: 150,
                    resizeMode: "cover",
                    width: deviceWidth / 1.18,
                    marginVertical: 5
                  }}
                  source={{uri:place.image_url}}
                />
                <Text></Text>
                <Text style={styles.text}>
                  Place: {place.name}
                </Text >
                <Text style={styles.text}>
                  Categories: {place.categories[0]['alias']}
                </Text>
                <Text style={styles.text}>
                  Address: {" "}
                  {place.location.display_address[0] +
                  place.location.display_address[1]}
                </Text>
              </Body>
            </CardItem>
            <CardItem  style={{ paddingVertical: 0 }} >
              <Left>
                <Button transparent>
                  <Icon name="logo-github" />
                  <Text>4,923 likes</Text>
                </Button>
              </Left>

            </CardItem>
            <CardItem bordered style={{ paddingVertical: 0 }} >
            <Left>
            </Left>
            <Body style={{alignContent:'flex-start'}}>
                <Button
                onPress={() => {
                  this.selectRoom();
                }}>
                <Text>Select</Text>
              </Button>
            </Body>
            <Right>
            </Right>
              
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5dc"
  },
  mb: {
    marginBottom: 15
  },
  text:{
    paddingTop: 10,
    alignSelf: "flex-start",
    fontSize: 16,
    fontFamily: "Cochin"
    //fontFamily:"Avenir"
  },
  title:{
    fontSize: 16,
    fontFamily:"Chalkboard SE"
  }
});

export default withNavigation(RoomDetailScreen);
