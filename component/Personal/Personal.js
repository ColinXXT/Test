import React, { Component } from 'react';  
import {  
  AppRegistry,  
  StyleSheet,  
  Text,  
  Navigator,  
  TouchableOpacity,  
  View  
} from 'react-native';  
  
import LogonComponent from '../Logon/Logon';  
   
export default class Personal extends Component {  
      
    constructor(props){  
      super(props);  
      this.state = {  
          userName: "",
          password:""  
      };  
    }  
  
    _pressButton() {  
        const {navigator} = this.props.nav;  
           if(navigator) {   
               navigator.pop();
           }  
    }  
    render() {  
        return (  
            <View style={styles.counter}>  
                <Text>Welcome {this.props.nav.userName} back</Text>  
                <TouchableOpacity onPress={()=>{this._pressButton()}}>  
                    <Text>切换帐号</Text>  
                </TouchableOpacity>  
            </View>  
        );  
    }  
  
}  
const styles = StyleSheet.create({  
    counter:{  
      flex:1,  
      justifyContent:'center',  
      alignItems:'center',  
      backgroundColor:'#e8e8e8'  
    }  
});  