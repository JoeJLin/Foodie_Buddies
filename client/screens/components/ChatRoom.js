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
    this.showAddModal = this.showAddModal.bind(this);
    this._CallOn = this._CallOn.bind(this);
  }
 
  showAddModal=()=>{
    this.refs.myModal.open();
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
                    ? this.showAddModal()
                    : this._CallOn();
                }
              }}
            >
              More {" "}
            </Text>
            <Icon
              name="ios-arrow-forward"
              style={{ fontSize: 25, color: "black" }}
            />
          </Button>
          <Text style={{
            paddingTop:20,
            paddingRight:30
              }}>
             {
               this.props.dataList.room.isPrivate
               ? (
                <Icon
                name="ios-lock"
                style={{ fontSize: 30, color: "red" }}
              />
               ):
               (
                <Icon
                name="ios-unlock"
                style={{ fontSize: 30, color: "black" }}
              />
               )
             }
          </Text>
        </Right>
       
        <Modal
            ref={"myModal"}
            style={{
                justifyContent:'center',
                backgroundColor:'#fff8dc',
                borderRadius: Platform.OS === 'ios'?30:0,
                shadowRadius:10,
                width:screen.width-80,
                height:160,
                //flex:1
            }}
            position='center'
            backdrop={true}
            onClosed={()=>{
                //alert(this.state.roomCode)
            }}
            >
            <Text style={{
                fontSize:16,
                fontWeight:'bold',
                textAlign:'center',
                marginTop:30
            }}>
                Enter Room Code
            </Text>
            <TextInput
               style={{
                   height:40,
                   borderBottomColor:'gray',
                   marginLeft:30,
                   marginRight:30,
                   marginTop:10,
                   marginBottom:10,
                   borderBottomWidth:1
               }} 
               onChangeText={(text)=>this.setState({Code:text})}
               placeholder="Plz enter the room's code"
               //value={this.state.Code}
               >
            
            </TextInput>        
            <Button
            style={{fontSize:18,color:'white'}}
            containerStyle={{
                padding:8,
                marginLeft:70,
                marginRight:70,
                height:40,
                borderRadius:6,
                backgroundColor:'#ffd700'
            }}
            onPress={() => {
                {this.props.dataList.room.roomCode == this.state.Code ? (
                    //alert("Matched")
                    this._CallOn()
                 // this._onPressAdd()
                ) : (
                alert("incorred")
                )}
                this.refs.myModal.close();
              }
            }
            >
                Submit
            </Button>

            </Modal>
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
