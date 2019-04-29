import React, { Component } from "react";
import { View, Text, AsyncStorage } from "react-native";
import { BING_MAP_KEY } from "../config/keys";
import axios from "axios";

class NavigationScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      latitude: null,
      longitude: null,
      error: null
    };
  }

  componentDidMount() {
    this.getLocationAsync();
    navigator.geolocation.getCurrentPosition(
      position => {
        console.log(position);
        // console.log(position.coords.latitude);
        let latitude = JSON.stringify(position.coords.latitude);
        let longitude = JSON.stringify(position.coords.longitude);
        const url = `http://dev.virtualearth.net/REST/v1/Locations/${latitude},${longitude}?key=${BING_MAP_KEY}`;
        console.log(url);
        AsyncStorage.setItem("latitude", latitude);
        AsyncStorage.setItem("longitude", longitude);
        axios
          .get(url)
          .then(response => {
            // AsyncStorage.setItem('zipCode', )
            console.log("asdfas");
            // response = JSON.stringify(response);
            // console.log(response.data.authenticationResultCode);
            console.log(
              response.data.resourceSets[0].resources[0].address.postalCode
            );
            return response.data.resourceSets[0].resources[0].address
              .postalCode;
          })
          .then(zipCode => {
            AsyncStorage.setItem("zipCode", JSON.stringify(zipCode));
          })
          .then(() => {
            let as = AsyncStorage.getItem("zipCode", (err, result) => {
              console.log(result);
            });
            // .then((err, result) =>
            //   console.log(result)
            // );
            // console.log(as);
          })
          .catch(err => {
            console.log(err);
          });
        // AsyncStorage.multiSet(
        //   [
        //     ["latitude", JSON.stringify(position.coords.latitude)],
        //     ["longitude", JSON.stringify(position.coords.longitude)]
        //   ],
        //   (err, result) => {
        //     if (err) {
        //       console.log(err);
        //       return;
        //     }
        //     console.log(result);
        //   }
        // );
        // AsyncStorage.multiGet(["latitude", "longitude"], (err, data) => {
        //   if (err) {
        //     console.log(err);
        //     return;
        //   }
        //   console.log(data);
        //   let latitude = data[0][1];
        //   let longitude = data[1][1];
        // });
        // AsyncStorage.setItem(
        //   "longitude",
        //   JSON.stringify(position.coords.longitude)
        // );
        // let ll = AsyncStorage.getItem("longitude");
        // console.log(ll);
        this.setState({
          // latitude: position.coords.latitude,
          // longitude: position.coords.longitude,
          error: null
        });
      },
      error => this.setState({ error: error.message }),
      {
        enableHighAccuracy: true,
        timeout: 20000
        //  maximumAge: 1000
      }
    );
  }

  async getLocationAsync() {
    const { Location, Permissions } = Expo;
    const { status } = await Permissions.askAsync(Expo.Permissions.CAMERA_ROLL);
    if (status === "granted") {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    } else {
      throw new Error("Location permission not granted");
    }
  }
  render() {
    return (
      <View
      // style={{ flexGrow: 1, alignItems: "center", justifyContent: "center" }}
      >
        {/* <Text>Latitude: {this.state.latitude}</Text>
        <Text>Longitude: {this.state.longitude}</Text> */}
        {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
      </View>
    );
  }
}

export default NavigationScreen;
