import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
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

      <ListItem avatar style={{ backgroundColor: "#fffff0" }}>
        <Left>
          <Thumbnail
            large
            source={{
              uri: this.props.dataList.imageUrl
                ? this.props.dataList.imageUrl
                : "../../assets/404.png"
            }}
          />
        </Left>
        <Body>
          <View>
            {/* {console.log(this.props.dataList.name)} */}
            <Text>{this.props.dataList.name}</Text>
            <Text> </Text>
            <Text note style={{ fontSize: 16, color: "black" }}>
              <Icon name="ios-flame" style={{ fontSize: 25, color: "red" }} />{" "}
              Rating: {this.props.dataList.rating}
            </Text>
            <Text note style={{ fontSize: 16, color: "black" }}>
              <Icon name="ios-star" style={{ fontSize: 25, color: "orange" }} />{" "}
              Rating: {this.props.dataList.price}
            </Text>
          </View>
        </Body>

        <Right>
          <Text />
          <Button transparent>
            <Text
              note
              style={{ fontSize: 16, color: "black" }}
              // data={this.props.dataList.id}
              onPress={() => {
                // console.log("console log!!!!!!!!!!! ", this.props.dataList.id);
                // console.log(this.props.navigation);
                this.props.navigation.navigate("Detail", {
                  itemId: this.props.dataList.id,
                  goBackKey: this.props.navigation.state.key,
                  updatePlaceState: this.props.navigation.state.params
                    .updatePlaceState
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

const styles = StyleSheet.create({
  mb10: {
    marginBottom: 10
  },
  mb35: {
    marginBottom: 35
  }
});
export default withNavigation(PlaceList);
