import React, {Component} from 'react';
import {Button, PermissionsAndroid, Text} from 'react-native';
import Base64 from 'base-64';
import {
  IDENTIFICATION_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URL,
} from './constants';

console.log(CLIENT_ID, CLIENT_SECRET);

/**
 * For the purpose of this demo, we generate the identification directly in the APP
 * /!\ THIS IS ALMOST ALWAYS A BAD IDEA /!\
 * Generating urls in the front means your credentials are stored in the front end
 *
 * @returns {Promise<{redirectUrl: Redirect URL, identificationUrl: Identification URL}>}
 */
const generateUbbleIdentification = async () => {
  const response = await fetch(IDENTIFICATION_URL, {
    method: 'POST',
    headers: {
      Accept: 'application/vnd.api+json',
      'Content-Type': 'application/vnd.api+json',
      Authorization:
        'Basic ' + Base64.encode([CLIENT_ID, CLIENT_SECRET].join(':')),
    },
    body: JSON.stringify({
      data: {
        type: 'identifications',
        attributes: {
          'redirect-url': REDIRECT_URL,
        },
      },
    }),
  });
  const {
    data: {attributes},
  } = await response.json();

  return {
    identificationUrl: attributes['identification-url'],
    redirectUrl: attributes['redirect-url'],
  };
};

export default class Home extends Component {
  static navigationOptions = {
    title: 'UbbleReactNativeDemo',
  };

  async onNavigate() {
    const {navigate} = this.props.navigation;
    const cameraPermissionGranted = await this.requestCameraPermission();
    console.log('Camera permission granted: ', cameraPermissionGranted);
    const {
      identificationUrl,
      redirectUrl,
    } = await generateUbbleIdentification();
    navigate('UbbleWebView', {identificationUrl, redirectUrl});
  }

  async requestCameraPermission() {
    try {
      return await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
        {},
      );
    } catch (err) {
      console.warn(err);
    }
  }

  render() {
    return (
      <Button title="Verify My Identity" onPress={() => this.onNavigate()} />
    );
  }
}
