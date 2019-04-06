import React, { Component } from 'react';
import {Text, TextInput,TouchableOpacity, TouchableHighlight,View } from 'react-native';
import DateTimePicker from 'react-native-modal-datetime-picker';

 class CalenderScreen extends Component {
  constructor(){
    super();
    this.state={
        showCancel: null
    }
  }
  render () {
    return (
      <View style={{ flex: 1 }}>
            <Text>
              Helloooo
              </Text>
      </View>
    );
  }

}
export default CalenderScreen;