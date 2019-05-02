import React from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import { Root } from "native-base";
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
import CalenderScreen from "./screens/CalenderScreen";
import SearchYelpPage from "./screens/SearchYelpPage";
import NavigationScreen from "./screens/NavigationScreen";
import DetailPage from "./screens/DetailPage";
import NameScreen from "./screens/NameScreen";
import AddressScreen from "./screens/AddressScreen";
import RoomDetailScreen from "./screens/RoomDetailScreen";
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
    Setting: { screen: SettingScreen }
  },
  {
    navigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state.routes[navigation.state.index];
      return {
        headerTitle: routeName,
        header: null
      };
    }
  }
);

const AppStackNavigator = createStackNavigator({
  Home: { screen: AppTabNavigator },
  // Navigation: { screen: NavigationScreen },
  Form: { screen: FormScreen },
  Calender: { screen: CalenderScreen },
  SearchYelpPage: { screen: SearchYelpPage },
  Detail: { screen: DetailPage },
  RoomDetail: { screen: RoomDetailScreen },
  ProfileScreen: { screen: ProfileScreen },
  NameScreen: { screen: NameScreen },
  AddressScreen: { screen: AddressScreen }
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

export default () => {
  return (
    <Root>
      <AppContainer />
    </Root>
  );
};
