import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  View,
  Text,
  AsyncStorage,
  StatusBar,
  ScrollView,
} from 'react-native';

import { fetchData } from '../api/api';

import Header from '../components/Header';
import CafeMap from '../components/CafeMap';
import CafeList from '../components/CafeList';

export default class Home extends Component {
  
    constructor(props) {
      super(props)
      this.state={
        data: [],
        favourites: []
      }
    }
  
    componentDidMount() {
      fetchData().then(res => {
        this.setState({data: res.venues});
      })
      .then( () => AsyncStorage.getAllKeys()
      .then( (keys) => { return AsyncStorage.multiGet(keys) } )
      .then( (result) => { 
        return result.map( (r) => {
           return JSON.parse(r[1]) 
          }) 
      })
      .then( (res) => {
        this.setState({favourites: res});
        for (const i of this.state.favourites){
          let obj = this.state.data.find((o, j) => {
            if (o.id === i.id) {
              let data = this.state.data;
              data[j].isFavourite = 1;
              this.setState({ data });
              i.distance = o.location.distance;
              AsyncStorage.setItem(i.id, JSON.stringify(i));
              return true;
            }
          });
        }
      })
      );
      
    }
  
    render() {
      return (
        <View style={styles.container}>
        <StatusBar backgroundColor='#0097A7' translucent={false} />
  
          <View style={styles.mapSection}>
            <CafeMap 
            data={this.state.data} 
            navigation={this.props.navigation} />
          </View>
          
          <View style={styles.listSection}>
            <CafeList 
              data={this.state.data} 
              navigation={this.props.navigation} />
          </View>
  
        </View>
      );
    }
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  mapSection: {
    flex: 6
  },
  listSection: {
    flex: 3
  }
});