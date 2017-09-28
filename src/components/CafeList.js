import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList
} from 'react-native';

export default class CafeList extends Component {

  showDetails(item) {
    const { navigate } = this.props.navigation;
    navigate('Details', item);
  }

  line = () => {
    return (
      <View
        style={{
          height: 1,
          width: "95%",
          backgroundColor: "lightgrey",
          marginLeft: "2%"
        }}
      />
    );
  };
  
  render() {
    return (
      <FlatList
        data={this.props.data} 
        keyExtractor={item => item.id}
        renderItem={ ({ item }) => (
          <View style={styles.item}>

            <View style={styles.leftSection}>
              <View style={[styles.iconCircle, (item.isFavourite?styles.fav:styles.notFav)]}>
              <Image 
              style={{
                height: 25,
                resizeMode: 'contain'
                }}
              source={require('../assets/Icons/coffee_cup.png')} />
              </View>
            </View>

            <View style={styles.middleSection}>
              <Text
                id={item.id}
                style={styles.cafe}
                onPress={ () => this.showDetails(item) }>
                {item.name} 
              </Text>
            </View>

            <View style={styles.rightSection}>
              <Text style={styles.green}>   OPEN</Text><Text style={styles.cafe}>{Math.round(item.location.distance/1000)}KM away</Text>
            </View>

          </View>
        )}
        ItemSeparatorComponent={this.line}
      />
    );
  }
}


const styles = StyleSheet.create({
  item: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding:2
  },
  fav: {
    backgroundColor: '#7ED321',
  },
  notFav: {
    backgroundColor: '#0097A7',
  },
  iconCircle: {
    height:38,
    width: 38,
    borderRadius: 38,
    alignItems: 'center',
    justifyContent: 'center'
  },
  leftSection: {
    marginLeft:20
  },
  middleSection: {
    marginLeft:20,
    width: 160
  },
  rightSection: {
    marginRight:20,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'flex-start'
  },
  cafe: {
    textAlign: 'left',
    color: '#0097A7',
    fontFamily: 'Nunito-Regular',
    padding: 10,
    fontSize: 18,
    height: 44,
  },
  green: {
    color: '#388E3C'
  }
});