import React, { Component } from "react";
import {
  View,
  TouchableOpacity,
  style,
  ImageBackground,
  ScrollView
} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Left,
  Right,
  Body,
  Text,
  List,
  Spinner
} from "native-base";
import NavigationScreen from "./NavigationScreen";
import HomeSearchBar from "./components/HomeSearchBar";
import Room from "./components/Room";
import axios from "axios";
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";
import registerForNotification from "./components/registerForPushNotificationsAsync";
import { Notifications } from "expo";

class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      keyword: null,
      latitude: null,
      longitude: null
    };
  }

  componentDidMount() {
    // registerForNotification.registerForPushNotificationsAsync();
    // Notifications.addListener(notification => {
    //   const {
    //     data: { text },
    //     origin
    //   } = notification;

    //   if (origin === "received" && text) {
    //     Alert.alert("New Push Notification", text, [{ text: "Ok." }]);
    //   }
    // });

    AsyncStorage.multiGet(["latitude", "longitude"], (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        latitude: parseFloat(results[0][1]),
        longitude: parseFloat(results[1][1])
      });
      axios
        .get(
          `${API_PATH}/room?latitude=${results[0][1]}&longitude=${
            results[1][1]
          }`
        )
        .then(places => {
          // console.log("place", places.data);
          this.setState({
            data: places.data
          });
        })
        .catch(err => {
          console.log("err", err);
        });
    });
  }

  handleChange = name => event => {
    this.setState(
      {
        [name]: event.nativeEvent.text
      }
      // this.yelpApi(this.state.term)
    );
  };

  submitSearch = () => {
    axios
      .get(`${API_PATH}/room/name?name=${this.state.keyword}`)
      .then(place => {
        this.setState({
          data: [place.data]
        });
      })
      .catch(err => {
        console.log("err is ", err);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const list = (
      // <ImageBackground
      // source={{uri:"https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"}}
      // style={{width: '100%', height: '100%'}}
      // >
      <ScrollView>
        <List>
          {this.state.data.map((item, i) => {
            return <Room key={i} dataList={item} />;
          })}
        </List>
      </ScrollView>
      //</ImageBackground>
    );
    return (
      <Container>
        <HomeSearchBar
          submit={() => {
            this.submitSearch();
          }}
          keyword={this.state.keyword}
          handleChange={event => this.handleChange(event)}
        />
        <NavigationScreen />
        {this.state.data.length !== 0 ? list : <Spinner color="blue" />}
        <Button
          rounded
          info
          onPress={() =>
            navigate("Form", {
              name: "form"
            })
          }
          style={{
            position: "absolute",
            top: "87%",
            right: 20
          }}
        >
          <Text> + </Text>
        </Button>
      </Container>
    );
  }
}

export default Feed;
