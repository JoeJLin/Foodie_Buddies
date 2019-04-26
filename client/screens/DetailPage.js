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
  Right,
  Spinner,
  List,
  ListItem
} from "native-base";
import { Col, Row, Grid } from "react-native-easy-grid";
import axios from "axios";
import { API_PATH } from "../config/keys";
import { AsyncStorage } from "react-native";

class DetailPage extends Component {
  constructor() {
    super();
    this.state = {
      data: null,
      isLoading: true
    };
  }

  componentDidMount() {
    console.log("asdf", this.props.navigation.state.params.itemId);
    let itemId = this.props.navigation.state.params.itemId;
    axios
      .get(`${API_PATH}/yelp/detail?id=${itemId}`)
      .then(response => {
        console.log(response.data);
        this.setState({
          isLoading: false,
          data: {
            name: response.data.jsonBody.name,
            id: response.data.jsonBody.id,
            imageUrl: response.data.jsonBody.image_url,
            url: response.data.jsonBody.url,
            phone: response.data.jsonBody.display_phone,
            reviewCount: response.data.jsonBody.review_count,
            categories: response.data.jsonBody.categories[0].title,
            rating: response.data.jsonBody.rating,
            address: response.data.jsonBody.location.display_address[0],
            photos: response.data.jsonBody.photos,
            price: response.data.jsonBody.price,
            hours: response.data.jsonBody.hours,
            price: response.data.jsonBody.price
          }
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  savePlaceId = () => {
    console.log("press the button");
    console.log(this.state.data.id);
    AsyncStorage.removeItem("selectedPlace");
    AsyncStorage.setItem(
      "selectedPlace",
      JSON.stringify({
        id: this.state.data.id,
        name: this.state.data.name
      }),
      (err, response) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(response);
      }
    );
  };

  render() {
    return (
      <Container>
        {this.state.isLoading ? (
          <Spinner color="blue" />
        ) : (
          <Card>
            <CardItem>
              <Left>
                <Thumbnail
                  source={{
                    uri: this.state.data.photos[0]
                  }}
                />
                <Text
                  style={{
                    fontSize: 16
                  }}
                >
                  {this.state.data.name}
                </Text>
              </Left>
              <Right>
                <Button>
                  <Text>Select </Text>
                </Button>
              </Right>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: "#87ceeb"
              }}
            >
              <Icon
                name="ios-contact"
                style={{
                  fontSize: 25
                }}
              />
              <Text>To Call: {this.state.data.phone} </Text>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: "#b0e0e6"
              }}
            >
              <Icon
                name="ios-filing"
                style={{
                  fontSize: 25
                }}
              />
              <Text>Address: {this.state.data.address} </Text>
            </CardItem>
            <CardItem
              style={{
                backgroundColor: "#87ceeb"
              }}
            >
              <Icon
                name="ios-heart"
                style={{
                  fontSize: 25
                }}
              />
              <Text>Categories: {this.state.data.categories} </Text>
            </CardItem>
            <CardItem
              style={{
                paddingTop: 10
              }}
            >
              <Thumbnail
                source={{
                  uri: this.state.data.photos[1]
                }}
                style={{
                  height: 200,
                  width: null,
                  flex: 1
                }}
              />
            </CardItem>
            <CardItem>
              <Thumbnail
                source={{
                  uri: this.state.data.photos[2]
                }}
                style={{
                  height: 200,
                  width: null,
                  flex: 1
                }}
              />
            </CardItem>
          </Card>
        )}
        <Button
          primary
          style={{
            alignSelf: "center"
          }}
          onPress={this.savePlaceId}
        >
          <Text> Select This </Text>
        </Button>
      </Container>
    );
  }
}

export default DetailPage;
