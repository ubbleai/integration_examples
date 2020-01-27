/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import Home from './Home';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import UbbleWebView from './UbbleWebView';

const MainNavigator = createStackNavigator({
  Home: {screen: Home},
  UbbleWebView: {screen: UbbleWebView},
});

const App = createAppContainer(MainNavigator);

export default App;
