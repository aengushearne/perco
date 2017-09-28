import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
  StatusBar,
  TouchableHighlight,
  BackHandler
} from 'react-native';

export default class Header extends Component {

  showFavourites() {
    const { navigate } = this.props.navigation;
    const favourites = this.props.favourites;
    navigate(this.props.navigation.state.routeName==='Favourites'?'Home':'Favourites', navigate);
  }

  render() {
    return (
      <View style={styles.head}>

        <View style={styles.section}>
        </View>

        <View style={styles.section}>
          <Image source={require('../assets/Icons/logo_navbar.png')} />
        </View>

        <View style={styles.sectionEnd}>
          <TouchableHighlight onPress={ () => this.showFavourites() }>
            <Image source={require('../assets/Icons/heart_filled.png')} />
          </TouchableHighlight>
        </View>

      </View>
    )
  }

}

const styles = StyleSheet.create({
  head: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#0097A7',
  },
  section: {
    flex: 1,
    alignItems: 'center'
  },
  sectionEnd: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginRight:15
  }
});