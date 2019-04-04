import React, { Component } from "react";
import { View,TouchableOpacity,style} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text
} from "native-base";

class Feed extends React.Component {
  render() {
    const {navigate} = this.props.navigation;

    return (
    //   <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //   <Text>Chat1</Text>
    //   <Button rounded info onPress={() => navigate('Form', {name: 'form'})}>
    //         <Text>Create</Text>
    //   </Button>
    // </View>  
    <Container style={styles.container}>
    <Header>
    <Left />
    <Body>
      <Title>Header</Title>
    </Body>
    <Right />
  </Header>

  <Content padder>
    <Button onPress={() => this.props.navigation.goBack()}>
      <Text>Back</Text>
    </Button>
  </Content>
</Container>
    
    
      
    );
  }
}

export default Feed;
