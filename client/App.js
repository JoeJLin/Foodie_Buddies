import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import axios from "axios";
import { API_PATH } from "./config/keys";

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state ={
      name: ""
    }
  }
  componentWillMount() {
    axios
      .get(`${API_PATH}/api`)
      .then(response => {
        this.setState({ name: response.data.name });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>{this.state.name}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;