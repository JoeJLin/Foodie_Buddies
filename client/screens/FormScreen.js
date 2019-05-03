import React, { Component } from "react";
import {
  ScrollView,
  View,
  StyleSheet,
  Image,
  Modal,
  TouchableHighlight,
  TouchableOpacity,
  AsyncStorage
} from "react-native";
import {
  Container,
  Header,
  Content,
  Button,
  Icon,
  Card,
  CardItem,
  Text,
  Left,
  Right,
  Form,
  Input,
  Item,
  Toast,
  Body,
  Textarea
} from "native-base";
import RNPickerSelect from "react-native-picker-select";
import DateTimePicker from "react-native-modal-datetime-picker";
import axios from "axios";
import { API_PATH } from "../config/keys";

// import SearchYelpPage from "./SearchYelpPage";

const People = [
  {
    label: "1 person",
    value: 1
  },
  {
    label: "2 people",
    value: 2
  },
  {
    label: "3 people",
    value: 3
  },
  {
    label: "4 people",
    value: 4
  },
  {
    label: "5 people",
    value: 5
  },
  {
    label: "6 people",
    value: 6
  },
  {
    label: "7 people",
    value: 7
  },
  {
    label: "8 people",
    value: 8
  },
  {
    label: "9 people",
    value: 9
  },
  {
    label: "10 people",
    value: 10
  }
];
const Roomtype = [
  {
    label: "Public",
    value: "Public"
  },
  { label: "Private", value: "Private" }
];
class FormScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      RoomValue: null,
      PrivateOrPublic: "Select Room Type",
      isDateTimePickerVisible: false,
      isTimePickerVisible: false,
      dateValue: null,
      TimeValue: null,
      isPrivate: false,
      roomCode: null,
      place: null,
      placeId: null,
      showToast: false,
      description: null,
      name: null
    };
  }
  // test = () => {
  //   console.log("this is test");
  //   console.log(this.props.navigation);
  // };
  componentDidMount() {
    console.log("here");
    // console.log(this.props.navigation);
    // AsyncStorage.getItem("selectedPlace", (err, result) => {
    //   console.log(err, result);
    //   if (err) {
    //     console.log(err);
    //     return;
    //   }
    // });
  }

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  _handleDatePicked = date => {
    console.log(date);
    date = new Date(date);
    let curDate =
      date.getMonth() + 1 + "/" + date.getDate() + "/" + date.getFullYear();
    console.log("A date has been picked: ", curDate);
    this._hideDateTimePicker();
    this.setState({ dateValue: curDate });
  };

  formatAmPm = date => {
    let time = new Date(date);
    let hours = time.getHours();
    let minutes = time.getMinutes();
    let ampm = hours >= 12 ? " PM" : " AM";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    let strTime = hours + ":" + minutes + ampm;
    return strTime;
  };

  _showTimePicker = () => this.setState({ isTimePickerVisible: true });

  _hideTimePicker = () => this.setState({ isTimePickerVisible: false });

  _handleTimePicked = date => {
    // date = new Date().toTimeString();
    let time = this.formatAmPm(date);
    console.log("A date has been picked: ", time);
    this._hideTimePicker();
    this.setState({ TimeValue: time });
  };

  // Determin the Room type by resetting the isPrivate state

  DeterminRoomType = () => {
    console.log("Here");
    console.log(this.state.isPrivate);

    if (this.state.PrivateOrPublic === "Private") {
      this.setState({ isPrivate: true });
    } else {
      this.setState({
        isPrivate: false
      });
    }

    console.log(this.state.isPrivate);
  };

  getPlaceInfo = data => {
    console.log(data);
    this.setState({ place: data.name, placeId: data.id });
  };

  submitForm = () => {
    console.log(this.state);
    const {
      RoomValue,
      dateValue,
      TimeValue,
      isPrivate,
      roomCode,
      placeId,
      name,
      description
    } = this.state;
    console.log(RoomValue, dateValue, TimeValue, isPrivate, roomCode, placeId);
    if (
      RoomValue !== null &&
      dateValue !== null &&
      TimeValue !== null &&
      isPrivate !== null &&
      placeId !== null &&
      description !== null &&
      name !== null
    ) {
      if (isPrivate === true && roomCode === null) {
        Toast.show({
          text: "Missing a code for psrivate room",
          buttonText: "Close",
          type: "danger",
          duration: 3000
        });
      } else if (isPrivate === false && roomCode === null) {
        console.log("do not have code and public");
        this.createRoom(
          RoomValue,
          dateValue,
          TimeValue,
          isPrivate,
          placeId,
          name,
          description
        );
      } else {
        console.log("private and have room code");
        this.createRoom(
          RoomValue,
          dateValue,
          TimeValue,
          isPrivate,
          placeId,
          name,
          description,
          roomCode
        );
      }
    } else {
      Toast.show({
        text: "Empty fields",
        buttonText: "Okay",
        type: "danger",
        duration: 3000
      });
    }
  };

  createRoom = (
    RoomValue,
    dateValue,
    TimeValue,
    isPrivate,
    placeId,
    name,
    description,
    roomCode
  ) => {
    // return new Promise((resolve, reject) => {
    console.log("in create room front end");
    AsyncStorage.getItem("userId", (err, userId) => {
      if (err) {
        reject(err);
        return;
      }

      axios
        .post(`${API_PATH}/room/create`, {
          RoomValue,
          dateValue,
          TimeValue,
          isPrivate,
          placeId,
          roomCode,
          userId,
          name,
          description
        })
        .then(result => {
          // console.log("in success");
          // console.log(result);
          // resolve(result);
          Toast.show({
            text: "Create room success",
            buttonText: "Okay",
            type: "success",
            duration: 3000
          });
          this.props.navigation.goBack();
          return;
        })
        .catch(err => {
          console.log(err);
          Toast.show({
            text: "Error in create room",
            buttonText: "Close",
            type: "danger",
            duration: 3000
          });
          // reject(err);
        });
    });
    // });
  };

  render() {
    const { navigation } = this.props; //Defind for Navagation
    // const { navigation } = this.props;
    //const time = navigation.getParam('time', 'Select Time');
    const placeholder = {
      label: "Select",
      value: null,
      color: "#151719"
    };
    const typeHolder = {
      label: "Select",
      value: null,
      color: "#151719"
    };
    const roomCode = (
      <CardItem>
        <Item regular>
          <Input
            placeholder="Enter room code"
            value={this.state.isPrivate ? roomCode : null}
            onChange={e => {
              this.setState({
                roomCode: e.nativeEvent.text
              });
            }}
          />
        </Item>
      </CardItem>
    );
    return (
      <Container style={styles.container}>
        <Image
          style={{
            width: 100 + "%",
            height: 230
          }}
          source={{
            uri:
              //"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS22ybkAttkcFp4y9vUNupY-RyE-iME6Qr8emVpaLHs-X4UzkeI"
              "https://images.pexels.com/photos/696218/pexels-photo-696218.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
          }}
        />

        <Content padder style={{paddingTop:10}}>
          <Card style={styles.mb}>
            <CardItem header bordered>
              <Text>Create room</Text>
            </CardItem>

            <CardItem  bordered>
              <Icon active name="ios-information-circle-outline" style={{ color: "black" }} />
              
                <Input
                  placeholder="Name"
                  onChange={e => {
                    this.setState({
                      name: e.nativeEvent.text
                    });
                  }}
                  value={this.state.name ? this.state.name : null}
                />
            </CardItem>
            <CardItem bordered>
            <Form style={{ width: "100%" }}>
                  <Textarea
                    rowSpan={2}
                    bordered
                    placeholder="Description"
                    value={
                      this.state.description ? this.state.description : null
                    }
                    onChange={e => {
                      this.setState({
                        description: e.nativeEvent.text
                      });
                    }}
                  />
                </Form>
            </CardItem>
            <CardItem  bordered>
              <Left>
                <Icon active name="ios-people" style={{ color: "black" }} />
                <ScrollView>
                  <RNPickerSelect
                    placeholder={typeHolder}
                    items={People}
                    onValueChange={value => {
                      console.log(value);
                      this.setState({
                        RoomValue: value
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

            <CardItem bordered >
              <Left>
                <Icon active name="ios-calendar" style={{ color: "#3B579D" }} />
                <TouchableOpacity onPress={this._showDateTimePicker}>
                  <Text>
                    {this.state.dateValue
                      ? this.state.dateValue
                      : "Select Date"}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isDateTimePickerVisible}
                  onConfirm={this._handleDatePicked}
                  onCancel={this._hideDateTimePicker}
                  mode={"date"}
                />
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon active name="ios-time" style={{ color: "#3B579D" }} />
                <TouchableOpacity onPress={this._showTimePicker}>
                  <Text>
                    {this.state.TimeValue
                      ? this.state.TimeValue
                      : "Select Time"}
                  </Text>
                </TouchableOpacity>
                <DateTimePicker
                  isVisible={this.state.isTimePickerVisible}
                  onConfirm={this._handleTimePicked}
                  onCancel={this._hideTimePicker}
                  mode={"time"}
                />
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            <CardItem bordered>
              <Left>
                <Icon active name="thumbs-up" style={{ color: "#55ACEE" }} />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("SearchYelpPage", {
                      updatePlaceState: data => this.getPlaceInfo(data)
                    });
                  }}
                >
                  <Text>
                    {this.state.place ? this.state.place : "Select Place"}
                  </Text>
                </TouchableOpacity>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>

            <CardItem bordered>
              <Left>
                <Icon active name="ios-lock" style={{ color: "black" }} />
                <ScrollView>
                  <RNPickerSelect
                    placeholder={typeHolder}
                    items={Roomtype}
                    onValueChange={value => {
                      this.setState({
                        PrivateOrPublic: value
                      });
                    }}
                    onDonePress={() => this.DeterminRoomType()}
                    style={pickerSelectStyles}
                  />
                </ScrollView>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </CardItem>
            {this.state.isPrivate ? roomCode : null}

          </Card>
          <Button
            info
            style={{ alignSelf: "center" }}
            onPress={() => this.submitForm()}
          >
            <Text>Submit</Text>
          </Button>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "rgba(255,228,181,0.5)",
    justifyContent: "center"
    //alignItems: "center",
  },
  mb: {
    padding: 0
  }
});
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    left: 5,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    color: "black",
    paddingRight: 30 // to ensure the text is never behind the icon
  }
});

export default FormScreen;
