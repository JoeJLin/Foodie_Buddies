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
import { Col, Row, Grid } from "react-native-easy-grid";
import { StyleSheet, TouchableOpacity,ImageBackground} from "react-native";
import errorPic from "../../assets/404.png";
import { withNavigation } from "react-navigation";


class Room extends Component {
  constructor() {
    super();
  }
  render() {
    console.log(this.props.dataList)
    return (
      <ListItem avatar style={{}}>
         <Left >
          <Thumbnail
          square
          large
            source={{
              uri: this.props.dataList.place.image_url
                ? this.props.dataList.place.image_url
                : "../../assets/404.png"
            }}
          style={{
            alignSelf:'center',
            width:130,
            height:120
          }}
          />
        </Left>
        <Body>
          <Text style={styles.title}>Event Name: {this.props.dataList.room.name}</Text>
            <Text></Text>
          
          <Text note style={styles.wording}>
            <Icon name="ios-flame" style={{ fontSize: 25, color: "red" }} />
            Rating: {this.props.dataList.place.rating}
          </Text>
          <Text note style={styles.wording}>
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

const styles = StyleSheet.create({
  mb10: {
    marginBottom: 10
  },
  mb35: {
    marginBottom: 35
  },
  container:{
    //height:150
  },
  wording:{
    fontSize: 16, color: "black" 
  },
  title:{
    paddingTop:10,
    alignSelf:'flex-start', 
    fontSize:20,
    fontFamily:'Cochin'
  }
});

export default withNavigation(Room);
