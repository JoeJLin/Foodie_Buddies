import React, { Component } from "react";
import { Button, View, Text, Image,StyleSheet,TouchableOpacity} from "react-native";
import { ImagePicker } from 'expo';
import {
  Container,
  Header,
  Title,
  Content,
  Icon,
  Left,
  Right,
  Body,
  Thumbnail,
  ListItem,
  List
} from "native-base";
class ProfileScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data:[],
      userId: "",
      image: null,
      UserName:""
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
  render() {
    //const { navigation } = this.props; 
    let { image } = this.state;
    const { navigation } = this.props;
    const NewName = navigation.getParam('username'); 
    const Address = navigation.getParam('address'); 
    let default_uri="https://images.pexels.com/photos/42415/pexels-photo-42415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    return (
      <Container>
      <Content style={styles.middle}>
          <ListItem >
            <Left style={{paddingLeft:40,
                          paddingTop:10,
                          paddingBottom:10 }}>
              < Text style={{fontSize:24}}>Personal Information</Text>
            </Left>
              <Right>
                  <Text>
                      Change
                  </Text>
              </Right>
          </ListItem>
          
          <ListItem icon last style={{
                  backgroundColor:'#fff',
                  height:100 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>Picture</Text>
                </Left>
                <Body>

                </Body>
                <Right style={{ height:100 }}>
                <Button
                  title="Change"
                  onPress={this._pickImage}
                    />
        {image &&
          <Image source={{ uri: image }} style={{ width: 70, height: 80 }} />}
            <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
               
                </Right>
          </ListItem>

          <ListItem>
          </ListItem>
          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>Name</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                <Text> {NewName}</Text>
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("NameScreen");
                  }}
                > 
                    <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
                  
                </TouchableOpacity>
              
                </Right>
          </ListItem>
          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>UserId</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                  <Text>
                     
                  </Text>
                <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
                </Right>
          </ListItem>
          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>Address</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                  <Text>
                  {Address}
                  </Text>
                  <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("AddressScreen");
                  }}
                > 
                    <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
                  
                </TouchableOpacity>
                </Right>
          </ListItem>

          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>UserId</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
                </Right>
          </ListItem>

          <ListItem>
          </ListItem>

      <ListItem icon last style={{
              backgroundColor:'#fff', 
                }}>
            <Left>
                <Icon active name="ios-cog" />
                 
            </Left>
            <Body>
              <Text style={{fontSize:16}}>Setting</Text>  
            </Body>
            <Right>
            <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
            </Right>
      </ListItem>
      </Content>
    </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    //flex:1,
    //justifyContent:'center'
    height:120
  },
  icon:{
     paddingBottom:40,
     paddingLeft:10,
  },
  body:{
    
      flex: 1,
      flexDirection: 'column',
      flexGrow:1,
//justifyContent: 'flex-start',
paddingBottom:40
  },
  middle:{
    //flex: 1,
    backgroundColor:'#dcdcdc',
    
  },
  list1:{
    backgroundColor:'#fff',
    paddingTop:20,
  }
});

export default ProfileScreen;


