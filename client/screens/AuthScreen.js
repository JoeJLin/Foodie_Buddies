import React, { Component } from "react";
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  Button,
  Image
} from "react-native";
import { Google } from "expo";
import { GOOGLE_IOS_CLIENT_KEY, API_PATH } from "../config/keys";
import axios from "axios";

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  signIn = async () => {
    try {
      const result = await Google.logInAsync({
        //iosClientId: YOUR_CLIENT_ID_HERE,  <-- if you use iOS
        iosClientId: GOOGLE_IOS_CLIENT_KEY,
        scopes: ["profile", "email"]
      });
      console.log(result);
      if (result.type === "success") {
        AsyncStorage.setItem("userId", result.user.id, (err, response) => {
          if (err) {
            console.log("error in setItem userId", err);
            return;
          }
          console.log("user id from google!!!!", result.user.id);
          this.registerUser(result.user);
          this.props.navigation.navigate("Home");
        });
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  registerUser = async user => {
    console.log("user!!!!!", user);
    axios
      .post(API_PATH + "/user", {
        email: user.email,
        familyName: user.familyName,
        givenName: user.givenName,
        photoUrl: user.photoUrl,
        userId: user.id
      })
      .then(response => {
        console.log(JSON.stringify(response));
      })
      .catch(err => {
        console.log(JSON.stringify(err));
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  },
  header: {
    fontSize: 25
  },
  image: {
    marginTop: 15,
    width: 150,
    height: 150,
    borderColor: "rgba(0,0,0,0.2)",
    borderWidth: 3,
    borderRadius: 150
  }
});
