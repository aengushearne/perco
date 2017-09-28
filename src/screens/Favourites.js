import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  AsyncStorage,
  BackHandler,
  StatusBar
} from 'react-native';

export default class Favourites extends Component {

  constructor(props) {
    super(props)
    this.state={
      favourites: []
    }
  }

  static navigationOptions = {
    title: 'Favourites',
  };

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

  componentDidMount() {
    AsyncStorage.getAllKeys()
    .then( (keys) => { return AsyncStorage.multiGet(keys) } )
    .then( (result) => { 
      return result.map( (r) => {
         return JSON.parse(r[1]) 
        }) 
    })
    .then( (res) => {
      this.setState({favourites: res});
    });

   // BackHandler.addEventListener('hardwareBackPress', this.navHome );
  }

  componentWillUnmount() {
   // BackHandler.removeEventListener('hardwareBackPress', this.navHome );
  }
  navHome() {
    const { navigate } = this.props.navigation;
    navigate('Home');
    return true;
  }
  render() {
    return (
      <View style={styles.container}>
      <StatusBar backgroundColor='#0097A7' translucent={false} />

        <View style={styles.listSection}>
          <FlatList
            data={this.state.favourites} 
            keyExtractor={item => item.id}
            renderItem={ ({ item }) => (
                <View style={styles.item}>
                  
                  <View style={styles.leftSection}>
                    <Text
                      id={item.id}
                      style={styles.cafe}>
                      {item.name} 
                    </Text>
                    <Text style={[styles.cafe, styles.grey]}>
                      {item.description} 
                    </Text>
                  </View>

                  <View style={styles.rightSection}>
                    <Text style={styles.distance}>{Math.round(item.distance/1000)}KM away</Text>
                  </View>

                </View>
              )}
            ItemSeparatorComponent={this.line}
          />
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listSection: {
    flex: 9
  },
  item: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding:2,
    height: 120
  },
  leftSection: {
    marginLeft:20
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
  },
  grey: {
    color: 'grey'
  },
  distance: {
    color: '#0097A7',
    fontFamily: 'Nunito-Regular',
    padding: 10,
    fontSize: 18,
    height: 44,
  }
});