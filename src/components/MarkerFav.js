import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class MarkerFav extends Component {

  render() {
    return (
      <View style={[styles.iconCircle, styles.fav]}>
      <Image 
      source={require('../assets/Icons/coffeecup.png')} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  fav: {
    backgroundColor: '#7ED321',
  },
  iconCircle: {
    height:38,
    width: 38,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0097A7',
  },
});