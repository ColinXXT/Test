/**
 * Created by Colin
 */
import React, { Component } from 'react';  
import {  
  AppRegistry,  
  StyleSheet,  
  Text,   
  TouchableOpacity,  
  View,
  Alert  
} from 'react-native';  
import MainScreen from '../MainFrame/MainScreen';

export default class CardView extends Component {  
    constructor(props){  
        super(props);  
      }   
      render() {  
          return (  
              <View style={styles.WelcomeStyle}>
                  <Text style={styles.FontStyle}>Welcome to {this.props.nav.state.selectedTab}</Text>
              </View> 
          );  
      }  
  }
  const styles = StyleSheet.create({
     WelcomeStyle :{flex:1,backgroundColor:'#00baff',alignItems:'center',justifyContent:'center'},
     FontStyle:{fontSize:22}
  });