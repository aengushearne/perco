import React, { Component } from 'react';
import { 
  StyleSheet, 
  Dimensions, 
  Image,
  View,
  Text
} from 'react-native';
import MapView from 'react-native-maps';

import MarkerFav from './MarkerFav';
import MarkerNotFav from './MarkerNotFav';

const screen = Dimensions.get('window');

const ASPECT_RATIO = screen.width / screen.height;
const LATITUDE = 45.5017;
const LONGITUDE = -73.5673;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class CafeMap extends Component {

  constructor(props) {
    super(props)
    this.state={
      region: {
        latitude: LATITUDE,
        longitude: LONGITUDE,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      },
      markers: []
    }
  }

  watchID: ?number = null

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        
        let lat = position.coords.latitude;
        let lng = position.coords.longitude;

        let region = {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }
        
        this.setState({region: region})
    },
    (error) => console.error(error),
    { enableHighAccuracy: false, timeout: 20000, maximumAge: 10000 });

    this.watchID = navigator.geolocation.watchPosition((position) => {
      let lat = position.coords.latitude;
      let lng = position.coords.longitude;

      let lastRegion = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }

      this.setState({region: lastRegion})
    })
    
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID)
  }

  showDetails(item) {
    const { navigate } = this.props.navigation;
    navigate('Details', item);
  }

  render() {
    return(
      <MapView
        provider={this.props.provider}
        style={styles.map}
        region={this.state.region}
        followUserLocation={true}
        zoomEnabled
        scrollingEnabled
        >
        <MapView.Marker coordinate={this.state.region} />
        {this.props.data.map(marker => (
            <MapView.Marker 
              coordinate={{
                  latitude: marker.location.lat,
                  longitude: marker.location.lng
              }}
              title={marker.name}
              key={marker.id}
              onPress={ () => this.showDetails(marker) }
              >
              {(marker.isFavourite?<MarkerFav />:<MarkerNotFav />)}
            </MapView.Marker>
          ))}
        </MapView>
    )
  }
}

const styles = StyleSheet.create({
  marker: {
    alignItems: 'center',
    justifyContent: 'center'
  },
  map: {
    flex: 1,
    width: screen.width,
    height: screen.height
  },
  fav: {
    backgroundColor: '#7ED321',
  },
  iconCircle: {
    height:38,
    width: 38,
    borderRadius: 38,
    backgroundColor: '#388E3C',
  },
  image: {
    height: 25,
    resizeMode: 'contain'
  }
});