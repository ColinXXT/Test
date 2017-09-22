/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
//引入 React的抽象组件
import React, { Component } from 'react';
//引入 ReactNative的具体组件
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TextInput
} from 'react-native';
import Navigator from './app/navigator';
import DropDown from './untils/DropdownAlert';
import Main from './untils/Main';
import DialogDemo from './untils/dialogDemo';
// class DropDownAlert extends Component {
//   render() {
//     return (
//       <DialogDemo/>
//     )
//   }
// }
AppRegistry.registerComponent('CJdome', () => Navigator);
