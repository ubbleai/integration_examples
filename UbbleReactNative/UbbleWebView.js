import React, {Component} from 'react';
import WebView from 'react-native-webview';

export default class UbbleWebView extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const {identificationUrl} = this.props.navigation.state.params;
    return <WebView source={{uri: identificationUrl}} />;
  }
}
