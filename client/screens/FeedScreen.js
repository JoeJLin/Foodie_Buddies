import React, { Component } from "react";
import { View,TouchableOpacity} from "react-native";
import { Container, Header, Content, Button, Icon, Text } from 'native-base';

class Feed extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Chat1</Text>
      <Button rounded info onPress={() => navigate('Form', {name: 'form'})}>
            <Text>Create</Text>
      </Button>
    </View>   
      
    );
  }
}

export default Feed;
