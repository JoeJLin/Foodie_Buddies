import React, { Component } from "react";
import { DatePickerIOS,ScrollView, View,StyleSheet,Image,Modal,TouchableHighlight, TouchableOpacity} from "react-native";
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
import RNPickerSelect from 'react-native-picker-select';
import DateTimePicker from 'react-native-modal-datetime-picker';
import CalenderScreen from "./CalenderScreen";

const People = [
  {
    label: '1 person',
    value: '1 person',
  },
  {
    label: '2 people',
    value: '2 people',
  },
  {
    label: '3 people',
    value: '3 people',
  },
  {
    label: '4 people',
    value: '4 people',
  },
  {
    label: '5 people',
    value: '5 people',
  },
  {
    label: '6 people',
    value: '6 people',
  },
  {
    label: '7 people',
    value: '7 people',
  },
  {
    label: '8 people',
    value: '8 people',
  },
  {
    label: '9 people',
    value: '9 people',
  },
  {
    label: '10 people',
    value: '10 people',
  },
];
const Roomtype =[{
  label: 'Public',
  value: 'Public'
},
  {label: 'Private',
  value: 'Private'
}
]
class FormScreen extends Component {
  constructor(){
    super();
    this.state={
      RoomValue : 'Select Roomsize',
      PrivateOrPublic: 'Select Room Type',
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      dateValue: 'Select Date',
      TimeValue: 'Select Time',
      isPrivate:false,
    }
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = (date) => {
    date = new Date().toDateString();

    console.log('A date has been picked: ', date);
    this._hideDateTimePicker();
    this.setState({dateValue:date})
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = (date) => {
    date = new Date().toTimeString();

    console.log('A date has been picked: ', date);
    this._hideTimePicker();
    this.setState({TimeValue:date})
  };
 
// Determin the Room type by resetting the isPrivate state

  DeterminRoomType = (PriviateOrPublic) =>{
    console.log('Here')
    console.log(this.state.isPrivate)

      if(PriviateOrPublic==='Private')
      {
        this.setState({ isPrivate: true });

        console.log('Hello');
        console.log(this.state.isPrivate);
      }
      else{
        // this.setState({
        //   isPrivate:false
        // })
        console.log('Kugou');
        console.log(this.state.isPrivate);
      }
      
  }

  render() {
    const {navigate} = this.props.navigation; //Defind for Navagation
    const { navigation } = this.props;
    //const time = navigation.getParam('time', 'Select Time');
    const placeholder = {
      label: 'Select',
      value: null,
      color: '#151719',
    };
    const typleHolder = {
      label: 'Select',
      value: null,
      color: '#151719',
    };

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

            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-people"
                  style={{ color: "black" }}
                /> 
               <ScrollView>
                <RNPickerSelect
                  placeholder={typleHolder}
                  items={People}
                  onValueChange={value => {
                    this.setState({
                      RoomValue: value,
                    });
                  }}
                  style={pickerSelectStyles}
                  />
                </ScrollView>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>     
            
            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-calendar"
                  style={{ color: "#3B579D" }}
                />
                 <TouchableOpacity onPress={this._showDateTimePicker}>
                <Text>{this.state.dateValue}</Text>
                </TouchableOpacity>
                <DateTimePicker
          isVisible={this.state.isDateTimePickerVisible}
          onConfirm={this._handleDatePicked}
          onCancel={this._hideDateTimePicker}
          mode={'date'}
        />
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>

            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-time"
                  style={{ color: "#3B579D" }}
                />
                 <TouchableOpacity onPress={this._showTimePicker}>
                <Text>{this.state.TimeValue}</Text>
                </TouchableOpacity>
                <DateTimePicker
          isVisible={this.state.isTimePickerVisible}
          onConfirm={this._handleTimePicked}
          onCancel={this._hideTimePicker}
          mode={'time'}
        />
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
           
            <CardItem>
              <Left>
                <Icon
                  active
                  name="ios-lock"
                  style={{ color: "black" }}
                /> 
               <ScrollView>
                <RNPickerSelect
                  placeholder={typleHolder}
                  items={Roomtype}
                  onValueChange={value => {
                    this.setState({
                      PrivateOrPublic: value,
                    });
                    
                    
                  }}

                  // Calling the OnDone function and call determinRoom Type function inside
                  onDonePress={()=>{
                    //console.log(this.state.PrivateOrPublic);
                    this.DeterminRoomType(this.state.PrivateOrPublic);
                      if(this.state.isPrivate){
                         return <CalenderScreen/>
                      }               
                  }}
                  style={pickerSelectStyles}
                  />
                </ScrollView>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
                  
            </CardItem> 

          </Card>
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
    flex:1,
    backgroundColor: "#FFF",
    justifyContent: "center", 
    //alignItems: "center",
  },
  mb: {
    marginBottom: 15
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    left:5,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default FormScreen;
