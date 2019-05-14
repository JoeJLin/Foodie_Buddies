import React, {Component} from 'react';
import{
    AppRegistry, StyleSheet, Text, View, Image, Alert,
    Platform, TouchableHighlight, Dimensions, TextInput
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  ListItem,
  Icon,
  Body,
  Left,
  Right
} from "native-base";

import Modal from 'react-native-modalbox';
import Button from 'react-native-button';


var screen = Dimensions.get('window');
class Match extends Component {
  constructor() {
    this.state={
        roomCode:' '
    }
  }
  componentDidMount(){
      console.log(this.state.roomCode)
  }
  render() {
    return (
           <View>
               <Text>
                    Hello
                </Text>
            </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  }
});

export default Match;
