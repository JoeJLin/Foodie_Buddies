import React, { Component } from "react";
import {
  Button,
  View,
  Text,
  AsyncStorage,
  Image,
  Platform,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { ImagePicker } from "expo";
import axios from "axios";
import { API_PATH } from "../config/keys";
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
  ListItem,
  List
} from "native-base";
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      image: "",
      firstName: "unKnown",
      lastName:''
    };
  }
  async componentDidMount() {
    AsyncStorage.getItem("userId", (err, userId) => {
      if (err) {
        console.log("error in get userId key", err);
        return;
      }
      this.setState({ userId });
      console.log("userId", userId);
      axios
    .get(`${API_PATH}/user/getUser?userId=${userId}`)
    .then(response => {
      console.log(response.data)
      this.setState({
        firstName:response.data.givenName,
        lastName:response.data.familyName,
        image:response.data.photoUrl
      });
    })
    .catch(err => {
      console.log(err);
    });
    });

}
  signOut = async () => {
    await AsyncStorage.removeItem("userId", (err, result) => {
      if (err) {
        console.log(err);
        return;
      }
      console.log("log out");
      console.log("aosnfoinaoisnfoiasndonafsnoini");
      this.props.navigation.navigate("Auth");
    });
  };

  render() {
    const { navigation } = this.props;
   
    return (
      <Container>
        <Header style={styles.container}>
          <Left style={styles.icon}>
            <Thumbnail
              large
              source={{
                uri: this.state.image
              }}
              style={{
                width: 100,
                height: 100
              }}
            />
          </Left>
          <Body style={styles.body}>
            <Text style={{ fontSize: 24 }}>{this.state.firstName} {this.state.lastName}</Text>

            <Text style={{ paddingTop: 10 }}>UserId:{this.state.userId}</Text>
          </Body>
          <Right>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate("ProfileScreen");
              }}
            >
              <Text
                style={{ fontSize: 16, paddingBottom: 40, paddingRight: 20 }}
              >
                More
              </Text>
            </TouchableOpacity>
            <Icon name="arrow-forward" style={{ paddingBottom: 30 }} />
          </Right>
        </Header>
        <Content style={styles.middle}>
          <ListItem />

          <ListItem
            icon
            last
            style={{
              backgroundColor: "#fff"
            }}
          >
            <Left>
              <Icon
                name="ios-close"
                style={{ fontSize: 40, paddingLeft: 5, color: "red" }}
              />
              <Button onPress={() => this.signOut()} title="Sign Out" />
            </Left>
            <Body />
            <Right>
              <Icon
                name="arrow-forward"
                style={{ fontSize: 30, paddingLeft: 5 }}
              />
            </Right>
          </ListItem>

          <ListItem />

          <ListItem
            icon
            last
            style={{
              backgroundColor: "#fff"
            }}
          >
            <Left>
              <Icon active name="ios-cog" />
            </Left>
            <Body>
              <Text style={{ fontSize: 16 }}>Setting</Text>
            </Body>
            <Right>
              <Icon
                name="arrow-forward"
                style={{ fontSize: 30, paddingLeft: 5 }}
              />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    //flex:1,
    //justifyContent:'center'
    height: 120
  },
  icon: {
    paddingBottom: 40,
    paddingLeft: 10
  },
  body: {
    flex: 1,
    flexDirection: "column",
    flexGrow: 1,
    //justifyContent: 'flex-start',
    paddingBottom: 40
  },
  middle: {
    //flex: 1,
    backgroundColor: "#dcdcdc"
  },
  list1: {
    backgroundColor: "#fff",
    paddingTop: 20
  }
});

export default Setting;
