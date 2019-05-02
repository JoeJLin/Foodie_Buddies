import React, { Component } from "react";
import { View, TouchableOpacity, style } from "react-native";
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
    AsyncStorage.multiGet(["latitude", "longitude"], (err, results) => {
      if (err) {
        console.log(err);
        return;
      }
      this.setState({
        latitude: parseFloat(results[0][1]),
        longitude: parseFloat(results[1][1])
      });
      // console.log(results);
      console.log("in  adsfasdf");
      axios
        .get(
          `${API_PATH}/room?latitude=${results[0][1]}&longitude=${
            results[1][1]
          }`
        )
        .then(places => {
          console.log("in placesss");
          // console.log("place", places.data);
          this.setState({ data: places.data });
        })
        .catch(err => {
          console.log("err", err);
        });
    });
  }

  handleChange = name => event => {
    console.log(event.nativeEvent.text);
    console.log("this should be keyword", name);
    this.setState(
      { [name]: event.nativeEvent.text }
      // this.yelpApi(this.state.term)
    );
  };

  submitSearch = () => {
    console.log("submit search");
    console.log(this.state.latitude, this.state.longitude);
    console.log(this.state.keyword);
    axios
      .get(`${API_PATH}/room?name=${this.state.keyword}`)
      .then(place => {
        console.log(place);
        this.setState({ data: place });
      })
      .catch(err => {
        console.log(err);
      });
  };

  render() {
    const { navigate } = this.props.navigation;
    const list = (
      <List>
        {this.state.data.map((item, i) => {
          return <Room key={i} dataList={item} />;
        })}
      </List>
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
          onPress={() => navigate("Form", { name: "form" })}
          style={{ position: "absolute", top: "87%", right: 20 }}
        >
          <Text>+</Text>
        </Button>
      </Container>
    );
  }
}

export default Feed;
