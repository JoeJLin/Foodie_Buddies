import React, { Component } from "react";
import { View,StyleSheet,Image,Modal,TouchableHighlight} from "react-native";
import {
  Container,
  Header,
  Title,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Body,
  Form
} from "native-base";


class FormScreen extends Component {
  constructor(){
    super();
    this.state={
      PickerValue : 'Select Roomsize',
      RoomsizeDisplayed:false
    }
  };
  setPickerValue(newValue){
    this.setState({
      PickerValue:newValue
    });

    this.togglePicker();
  }
togglePicker(){
  this.setState({
    RoomsizeDisplayed:!this.state.RoomsizeDisplayed
  })
}
  render() {
    const Roomsize = [{
      title: "One Person",
      Value: '1 person'
  },
  {
    title: "Two People",
    Value: '2 people'
  },
  {
    title: "Three Peple",
    Value: '3 people'
},
{
  title: "Four People",
  Value: '4 people'
},
]
    return (
      <Container style={styles.container}>
        <Image style={{
            width : 100+'%',
            height: 150
          }} 
          source={{
            uri:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22ybkAttkcFp4y9vUNupY-RyE-iME6Qr8emVpaLHs-X4UzkeI"
          }}/>

       <Content padder>
          <Card style={styles.mb}>
            <CardItem header bordered>
              <Text>Make a Reservaton</Text>
            </CardItem>
            <TouchableHighlight onPress={() =>this.togglePicker()}>
            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-people"
                  style={{ color: "#DD5044" }}
                /> 
              <Text> {this.state.PickerValue}</Text>
                
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            </TouchableHighlight>
            <CardItem>
              <Left>
                <Icon
                  active
                  name="md-time"
                  style={{ color: "#3B579D" }}
                />
                <Text>SelecTime</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem>
              <Left>
                <Icon active name="thumbs-up" style={{ color: "#55ACEE" }} />
                <Text>Select place</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
          </Card>
          
          <Modal visible ={this.state.RoomsizeDisplayed}  animatedType ={"slide"} transparent ={true} >
                  <View style ={{
                  margin:20, 
                  padding:20,
                  backgroundColor:'#efefef',
                  bottom:0,
                  left:0,
                  right:0,
                  alignItems:'center',
                  position:'absolute'}}>
          
                  
                <Text style ={{fontWeight:'bold', marginBottom:10}}>Value</Text>
                {Roomsize.map((value,index)=>{
                  return  <TouchableHighlight key ={index} onPress={()=>this.setPickerValue(value.Value)}style={{paddingTop:4, paddingBottom:4}}>
                  <Text>{value.title}</Text>
                    </TouchableHighlight>
                })}
                  
                    <TouchableHighlight onPress={() =>this.togglePicker()} style={{paddingTop:4, paddingBottom:4}}>
                        <Text style={{ color : '#999'}}> Cancel</Text>
                    </TouchableHighlight>

                  
                  </View>



              </Modal>
        </Content>

      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF"
  },
  mb: {
    marginBottom: 15
  }
});

export default FormScreen;