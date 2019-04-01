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
import { GOOGLE_IOS_CLIENT_KEY } from "../config/keys";

export default class AuthScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      signedIn: false,
      name: "",
      photoUrl: ""
    };
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
        this.setState({
          signedIn: true,
          name: result.user.name,
          photoUrl: result.user.photoUrl
        });
        await AsyncStorage.setItem("userToken", result.idToken);
        console.log(result.idToken);
        this.props.navigation.navigate("Home");
      } else {
        console.log("cancelled");
      }
    } catch (e) {
      console.log("error", e);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in with Google" onPress={() => this.signIn()} />
      </View>
    );
  }
}

const LoginPage = props => {
  return (
    <View>
      <Text style={styles.header}>Sign In With Google</Text>
      <Button title="Sign in with Google" onPress={() => props.signIn()} />
    </View>
  );
};

const LoggedInPage = props => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome:{props.name}</Text>
      <Image style={styles.image} source={{ uri: props.photoUrl }} />
    </View>
  );
};

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
