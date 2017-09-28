import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Image,
  StatusBar,
  TouchableHighlight,
  Dimensions,
  WebView,
  AsyncStorage,
  BackHandler
} from 'react-native';
import MapView from 'react-native-maps';
import LinearGradient from 'react-native-linear-gradient';
import call from 'react-native-phone-call';

import { fetchVenueDetails } from '../api/api';

const width = Dimensions.get('window').width

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      data: [],
      error: null,
      url: '',
      heartTint: 'grey'
    };
  }

  componentWillMount() {
    venueId=this.props.navigation.state.params.id;
    fetchVenueDetails(venueId).then(res => {
      this.setState({
        data: res,
        phone: res.venue.contact.phone,
        description: res.venue.description?res.venue.description:'A coffee shop',
        url: res.venue.url,
        longitude: res.venue.location.lng,
        latitude: res.venue.location.lat,
        photo: res.venue.bestPhoto.prefix + '500x300' + res.venue.bestPhoto.suffix,
        });
    });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => this.navHome() );
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => this.navHome() );
  }

  saveFavourite() {
    this.setState({ heartTint:'#388E3C' })
    const favouritesObj = { 
      id: this.props.navigation.state.params.id,
      name: this.props.navigation.state.params.name, 
      description: this.state.description,
      distance: this.props.navigation.state.params.location.distance 
    };
    //AsyncStorage.clear();
    AsyncStorage.setItem(this.props.navigation.state.params.id, JSON.stringify(favouritesObj));
  }

  showWebsite(site) {
    const { navigate } = this.props.navigation;
    navigate('CafeWeb', site);
  }

  navHome() {
    const { navigate } = this.props.navigation;
    navigate('Home');
    return true;
  }

  dialNumber() {
    const args = {
      number: this.props.navigation.state.params.contact.phone,
      prompt: true
    }
     
    call(args).catch(console.error)
  }

  render() {
    return (
        <ScrollView>
        <View style={styles.container}>
          <StatusBar backgroundColor='rgba(255, 255, 255, 0)' translucent={true} />

          <View style={styles.imageSection}>
            <Image
              // style={{width: width, height: 250}}
                source={{uri: this.state.photo}}>
              <LinearGradient colors={['rgba(0,0,0,0.7)', 'rgba(255,255,255,0.1)']} style={styles.linearGradient}>
                <Text style={styles.cafeName}>{this.props.navigation.state.params.name}</Text>
                
                <View style={styles.chevronContainer}>
                  <TouchableHighlight onPress={ () => this.navHome() }>
                  <Image
                    style={{width: 36, height: 36}}
                    source={require('../assets/Icons/chevron-left.png')} />
                  </TouchableHighlight>
                </View>

                <View style={styles.phoneContainer}>
                  <TouchableHighlight onPress={ () => this.dialNumber() }>
                    <Image source={require('../assets/Icons/phone.png')} />
                  </TouchableHighlight>
                </View>
              </LinearGradient>
              <View style={styles.float}>
                <Image
                  style={{width: 80, height: 80}}
                  source={require('../assets/Icons/coffee_logo.png')} />
              </View>
            </Image>
          </View>

          <View style={styles.heartContainer}>
            <TouchableHighlight onPress={ () => this.saveFavourite() }>
              <Image
                tintColor={this.state.heartTint}
                source={require('../assets/Icons/heart_filled.png')} />
            </TouchableHighlight>
          </View>

          <View style={styles.details}>
            
            <View style={styles.addressSection}>
              <Text style={styles.address}>
                {this.props.navigation.state.params.location.address},{'\n'}
                {this.props.navigation.state.params.location.city}, {this.props.navigation.state.params.location.postalCode}{'\n'}
                <Text style={styles.green}>Open Now</Text>
              </Text>
            </View>

            <View style={styles.mapSection}>
              <MapView
                style={styles.map}
                region={{
                  latitude: this.props.navigation.state.params.location.lat,
                  longitude: this.props.navigation.state.params.location.lng,
                  latitudeDelta: 0.01922,
                  longitudeDelta: 0.00421,
                }}
                showsMyLocationButton={false}
                showsCompass={false}
                showsTraffic={false}
                zoomEnabled={false}
                rotateEnabled={false}
                scrollEnabled={false}
                pitchEnabled={false}
              >
                <MapView.Marker
                  coordinate={{
                    latitude: this.props.navigation.state.params.location.lat,
                    longitude: this.props.navigation.state.params.location.lng,
                  }} >
                  <Image
                    style={{width:40, height:40}}
                    source={require('../assets/Icons/map_marker.png')}
                  />
                </MapView.Marker>
              </MapView>
            </View>

            <View style={styles.descriptionSection}>
              <Text style={styles.descriptionHeading}>Description</Text>
              <Text style={styles.description}>{this.state.description}</Text>
            </View>

          </View>

          <TouchableHighlight
            style={styles.websiteButton}
            onPress={ () => this.showWebsite(this.state.url) }>
            <Text style={styles.buttonText}>OPEN WEBSITE</Text>
          </TouchableHighlight>
        </View>
        </ScrollView>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'space-between'
  },
  imageSection: {
    flex: 3
  },
  image: {
    flexGrow:1,
    height:null,
    width:null,
    alignItems: 'center',
    justifyContent:'center',
  },
  linearGradient: {
    height: 250,
  },
  chevronContainer: {
    position: 'absolute',
    top: 38,
    left: 15,
    zIndex: 9
  },
  phoneContainer: {
    position: 'absolute',
    top: 40,
    right: 17,
    zIndex: 9
  },
  float: {
    position: 'absolute',
    top: 210,
    left: 10,
    zIndex: 9
  },
  heartContainer: {
    flex:1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
    paddingRight: 15
  },
  cafeName: {
    marginTop:34,
    fontFamily: 'Nunito-Regular',
    fontSize: 30,
    color: 'white',
    textAlign: 'center',
  },
  details: {
    flex: 4,
    justifyContent:'space-between',
    alignItems: 'center',
    zIndex: 1
  },
  addressSection: {
    flex:1,
    marginTop: 0,
    marginBottom: 30
  },
  address: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: 18
  },
  green: {
    color: '#388E3C'
  },
  mapSection: {
    flex:2,
    margin:15
  },
  map: {
    flex: 1,
    width: width - 30,
    height: 150,
  },
  descriptionSection: {
    flex:1,
    marginTop: 15,
    marginBottom: 40
  },
  descriptionHeading: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    fontSize: 22,
    marginBottom: 15
  },
  description: {
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    color: 'grey',
    fontSize: 22,
  },
  websiteButton: {
    backgroundColor: '#0097A7'
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 20,
    padding: 18
  }
});