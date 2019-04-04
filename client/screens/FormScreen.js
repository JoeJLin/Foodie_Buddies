import React, { Component } from "react";
import { StyleSheet,Platform,Button, View, Text, Picker, Modal,TouchableHighlight} from "react-native";
import Calendar from 'react-native-calendar-datepicker';
import Moment from 'moment';

class FormScreen extends React.Component {
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
      // <Button
      //   title="Home"
      //   onPress={() => navigate("Profile", { name: "Jane" })}
      // />
      <View style={styles.container}>
        <TouchableHighlight onPress={() =>this.togglePicker()} style={{paddingTop:4, paddingBottom:4}}>
                  <Text style={styles.RoomBoder}> {this.state.PickerValue}</Text>
        </TouchableHighlight>

        <Modal visible ={this.state.RoomsizeDisplayed}  animatedType ={"slide"} transparent ={true} >
            <View style ={{
            margin:20, 
            padding:20,
            backgroundColor:'#efefef',
            bottom:20,
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


      </View>
    );
  }
}

const styles = StyleSheet.create({
  container : {
    flex:1,
    backgroundColor : '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  RoomBoder:{
    padding:10,
    margin:10,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  }
})
export default FormScreen ;
