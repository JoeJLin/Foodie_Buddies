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
import axios from "axios";
import { API_PATH } from "../config/keys";

class DetailPage extends Component {
  constructor() {
    super();
    this.state = { data: null, isLoading: true };
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
                source={{ uri: this.state.data.photos[0] }}
              />
              <Text style={{fontSize:16}}>
                  {this.state.data.name}
              </Text>
              </Left>
            </CardItem> 
            <CardItem>
              <Thumbnail
                source={{ uri: this.state.data.photos[1] }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
            <CardItem>
              <Thumbnail
                source={{ uri: this.state.data.photos[2] }}
                style={{ height: 200, width: null, flex: 1 }}
              />
            </CardItem>
          </Card>
        )}
      </Container>
    );
  }
}

export default DetailPage;
