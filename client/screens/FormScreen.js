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
      RoomValue : 'Select Roomsize',
      PrivateOrPublic: 'Select Room Type',
      RoomsizeDisplayed:false,
      TypeDisplayed:false
    }
  };
  setRoomValue(newValue){
    this.setState({
      RoomValue:newValue
    });
    console.log(this.state.RoomValue)
    this.toggleSize();
  }

  setTypeValue(newValue){
    this.setState({
      PrivateOrPublic:newValue

    },
    console.log(this.state.PrivateOrPublic)
    );

    this.toggleType();
  } 
toggleSize(){
  this.setState({
    RoomsizeDisplayed:!this.state.RoomsizeDisplayed
  })
}

toggleType(){
  this.setState({
    TypeDisplayed:!this.state.TypeDisplayed
  })
}
  render() {
    const {navigate} = this.props.navigation; //Defind for Navagation

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
}
]
const Roomtype =[{
    title: 'Public',
    value: 'Public'
},
    {title: 'Private',
    value: 'Private'
  }
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
            <TouchableHighlight onPress={() =>this.toggleSize()}>
            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-people"
                  style={{ color: "#DD5044" }}
                /> 
              <Text> {this.state.RoomValue}</Text>
                
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            </TouchableHighlight>

            <TouchableHighlight onPress={() => navigate('Calender', {name: 'Calender'})}>
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
            </TouchableHighlight>

            <CardItem>
              <Left>
                <Icon active name="thumbs-up" style={{ color: "#55ACEE" }} />
                <Text>Select place</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <TouchableHighlight onPress={() =>this.toggleType()}>
            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-lock"
                  style={{ color: "black" }}
                /> 
              <Text> {this.state.PrivateOrPublic}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            </TouchableHighlight>
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
                  return  <TouchableHighlight key ={index} onPress={()=>this.setRoomValue(value.Value)}style={{paddingTop:4, paddingBottom:4}}>
                  <Text>{value.title}</Text>
                    </TouchableHighlight>
                })}
                  
                    <TouchableHighlight onPress={() =>this.toggleSize()} style={{paddingTop:4, paddingBottom:4}}>
                        <Text style={{ color : '#999'}}> Cancel</Text>
                    </TouchableHighlight>

                  
                  </View>
              </Modal>
          <Modal visible ={this.state.TypeDisplayed}  animatedType ={"slide"} transparent ={true} >
                  <View style ={{
                  margin:20, 
                  padding:20,
                  backgroundColor:'#efefef',
                  bottom:0,
                  left:0,
                  right:0,
                  alignItems:'center',
                  position:'absolute'}}>
          
                  
                <Text style ={{fontWeight:'bold', marginBottom:10}}>Room Type</Text>
                {Roomtype.map((value,index)=>{
                  return  <TouchableHighlight key ={index} onPress={()=>this.setTypeValue(value.value)}style={{paddingTop:4, paddingBottom:4}}>
                  <Text>{value.title}</Text>
                    </TouchableHighlight>
                })}
                  
                    <TouchableHighlight onPress={() =>this.toggleType()} style={{paddingTop:4, paddingBottom:4}}>
                        <Text style={{ color : '#999'}}> Cancel</Text>
                    </TouchableHighlight>

                  
                  </View>
              </Modal>
              <Button info style={{alignSelf:'center'}}>
                <Text>
                  Sumbit
                </Text>
            </Button>
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