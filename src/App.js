import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
} from 'react-native';
import { StackNavigator } from 'react-navigation';

import Header from './components/Header';
import Home from './screens/Home';
import Details from './screens/Details';
import Favourites from './screens/Favourites';
import CafeWeb from './components/CafeWeb';

class HomeScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: ( <Header navigation={navigation}/>)
  })
  render() {
    return (
      <Home navigation={this.props.navigation} />
    );
  }
}

class FavouritesScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: ( <Header navigation={navigation}/>)
  })
  render() {
    return (
      <Favourites navigation={this.props.navigation} />
    );
  }
}

class DetailsScreen extends React.Component {
  static navigationOptions = ({ navigation }) => ({
    header: null
  })
  render() {
    return (
      <Details navigation={this.props.navigation}/>
    );
  }
}

const perco = StackNavigator({ 
  Home: { screen: HomeScreen }, 
  Details: { screen: DetailsScreen }, 
  Favourites: { screen: FavouritesScreen },
  CafeWeb: { screen: CafeWeb }
});
export default perco;

AppRegistry.registerComponent('perco', () => perco);