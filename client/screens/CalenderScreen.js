import React, { Component } from "react";
import { Button, DatePickerIOS, View, StyleSheet } from "react-native";

class CalenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { chosenDate: new Date() };

    this.setDate = this.setDate.bind(this);
  }

  setDate(newDate) {
    this.setState({ chosenDate: newDate });
    //console.log(this.state.chosenDate);
  }

  render() {
    return (
      <View style={styles.container}>
        <DatePickerIOS
          date={this.state.chosenDate}
          onDateChange={this.setDate}
        />

        <Button
          title="Confirm"
          onPress={() => {
            /* 1. Navigate to the Details route with params */
            this.props.navigation.navigate("Form", {
              time: this.state.chosenDate
            });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});

export default CalenderScreen;
