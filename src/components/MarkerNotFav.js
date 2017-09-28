import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

export default class MarkerNotFav extends Component {

  render() {
    return (
      <View style={styles.iconCircle}>
        <Image 
          source={require('../assets/Icons/coffeecup.png')} />
      </View>
    )
  }

}

const styles = StyleSheet.create({
  iconCircle: {
    height:38,
    width: 38,
    borderRadius: 38,
    backgroundColor: '#0097A7',
    justifyContent: 'center', 
    alignItems: 'center',
    padding:5
  },
});