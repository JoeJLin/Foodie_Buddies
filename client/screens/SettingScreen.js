import React, { Component } from "react";
import { Button, View, Text, AsyncStorage } from "react-native";
import ImagePicker from "react-native-image-picker";
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: ""
    };
  }
 
  async componentDidMount() {
    const userId = await AsyncStorage.getItem("userId");
    this.setState({ userId });
    console.log("userId", userId);
  }

  signOut = async () => {
    await AsyncStorage.removeItem("userId");
    console.log("log out");
    console.log("aosnfoinaoisnfoiasndonafsnoini")
    this.props.navigation.navigate("Auth");
  };
  handleChoosePhoto=()=>{
    const options = {
      title: 'Select Avatar',
      customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      // Same code as in above section!

    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.userId}</Text>
        <Button onPress={() => this.signOut()} title="Sign Out" />
        <Button
          title="Choose Photo"
          onPress={ this.handleChoosePhoto}
        />
        
      </View>
    );
  }
}

export default Setting;
