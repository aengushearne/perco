import React, { Component } from 'react';
import {
  WebView,
} from 'react-native';

export default class CafeWeb extends Component {

  render() {
    return (
      <WebView source={{uri: this.props.navigation.state.params }} style={{marginTop: 20}} />
    )
  }

}