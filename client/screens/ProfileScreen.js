import React, { Component } from "react";
import { Button, View, Text, Image,StyleSheet} from "react-native";
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
      userId: "",
      image: null,
    };
    
  }
  render() {
    //const { navigation } = this.props; 
    let default_uri="https://images.pexels.com/photos/42415/pexels-photo-42415.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
    return (
      <Container>
      <Content style={styles.middle}>
          <ListItem >
            <View style={{paddingLeft:80,
                          paddingTop:10,
                          paddingBottom:10 }}>
              < Text style={{fontSize:24}}>Personal Information</Text>
            </View>
         
          </ListItem>
          
          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>Picture</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
                </Right>
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
                <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
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
          <ListItem icon last style={{
                  backgroundColor:'#fff', 
                    }}>
                <Left>
                < Text style={{fontSize:16}}>Address</Text>
                </Left>
                <Body>

                </Body>
                <Right>
                <Icon name="arrow-forward" style={{ fontSize: 30,paddingLeft:5}} />
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


