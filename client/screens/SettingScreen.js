import React, { Component } from "react";
import { Button, View, Text, AsyncStorage, Image ,Platform} from "react-native";
import { ImagePicker } from 'expo';
class Setting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      image: null,
    };
    
  }
  createFormData = (image, body) => {
  const data = new FormData();

  data.append("photo", {
    name: image.fileName,
    type: image.type,
    uri:
      Platform.OS === "android" ? image.uri : image.uri.replace("file://", "")
  });

  Object.keys(body).forEach(key => {
    data.append(key, body[key]);
  });

  return data;
};
handleUploadPhoto = () => {
  console.log("Calling fetch");
  fetch("http://localhost:5000/user/pictures", {
    method: "POST",
    body: this.createFormData(this.state.image, this.state.userId)
  })
    .then(response => response.json())
    .then(response => {
      console.log("upload succes", response);
      alert("Upload success!");
      this.setState({ image: null });
    })
    .catch(error => {
      console.log("upload error", error);
      alert("Upload failed!");
    });
};
  async componentDidMount() {
    const userId = await AsyncStorage.getItem("userId");
    this.setState({ userId });
    console.log("userId", userId);
  }
 _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
    });

    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  }

  signOut = async () => {
    await AsyncStorage.removeItem("userId");
    console.log("log out");
    console.log("aosnfoinaoisnfoiasndonafsnoini")
    this.props.navigation.navigate("Auth");
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>{this.state.userId}</Text>
        <Button onPress={() => this.signOut()} title="Sign Out" />
        <Button
          title="Choose Photo"
          onPress={ this._pickImage}
        />
         <Button title="Upload" 
         onPress={this.handleUploadPhoto} />
        {image &&
          <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
      </View>
    );
  }
}

export default Setting;

