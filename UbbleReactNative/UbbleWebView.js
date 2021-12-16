import React, {Component} from 'react';
import WebView from 'react-native-webview';

export default class UbbleWebView extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  render() {
    const {identificationUrl} = this.props.navigation.state.params;
    // allowsInlineMediaPlayback is required for the streaming to work in iOS
    // See https://github.com/react-native-webview/react-native-webview/blob/master/docs/Reference.md#allowsinlinemediaplayback
    return (
      <WebView source={{uri: identificationUrl}} allowsInlineMediaPlayback />
    );
  }
}
