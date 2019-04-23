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
  ListItem,
  Right
} from "native-base";
import errorPic from "../../assets/404.png";
import { withNavigation } from "react-navigation";

class PlaceList extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      // <ListItem>
      <ListItem avatar>
        <Left>
          <Thumbnail
            source={{
              uri: this.props.dataList.imageUrl
                ? this.props.dataList.imageUrl
                : "../../assets/404.png"
            }}
          />
        </Left>
        <Body>
          {/* {console.log(this.props.dataList.name)} */}
          <Text>{this.props.dataList.name}</Text>
          <Text note>Rating: {this.props.dataList.rating}</Text>
          <Text note>Rating: {this.props.dataList.price}</Text>
        </Body>
        <Right>
          <Button transparent>
            <Text
              note
              // data={this.props.dataList.id}
              onPress={() => {
                console.log("console log!!!!!!!!!!! ", this.props.dataList.id);
                this.props.navigation.navigate("Detail", {
                  itemId: this.props.dataList.id
                });
              }}
            >
              View
            </Text>
          </Button>
        </Right>
      </ListItem>
    );
  }
}

export default withNavigation(PlaceList);
