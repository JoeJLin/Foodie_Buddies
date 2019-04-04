import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import axios from "axios";
import { API_PATH } from "./config/keys";

import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import WelcomeScreen from "./screens/WelcomeScreen";
import ChatScreen from "./screens/ChatScreen";
import SettingScreen from "./screens/SettingScreen";
import FeedScreen from "./screens/FeedScreen";
import AuthScreen from "./screens/AuthScreen";
import FormScreen from "./screens/FormScreen";
import Calender from "./screens/CalenderScreen";

/**
 *  AppSwitchNavigator
 *    -Welcome Screen
 *      -Login Button
 *      -SignUp Button
 *    -AppStackNavigator
 *      -AppTabNavigator
 *        -Feed
 *        -Chat
 *        -Profile?????
 *        -Setting
 */

const AppTabNavigator = createBottomTabNavigator(
  {
    Feed: { screen: FeedScreen },
    Chat: { screen: ChatScreen },
    // Profile: { screen: ProfileScreen },
    Setting: { screen: SettingScreen },
    calender: {screen: Calender}
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName
      };
    }
  }
);

const AppStackNavigator = createStackNavigator({
  Home: { screen: AppTabNavigator },
  Form : {screen: FormScreen},
});

const AppSwitchNavigator = createSwitchNavigator(
  {
    Welcome: { screen: WelcomeScreen },
    Home: { screen: AppStackNavigator },
    Auth: { screen: AuthScreen }
  },
  {
    initialRouteName: "Welcome"
  }
);

const AppContainer = createAppContainer(AppSwitchNavigator);

export default AppContainer;
