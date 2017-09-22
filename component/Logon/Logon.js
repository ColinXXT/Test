import React, { Component } from 'react';  
import {  
  AppRegistry,  
  StyleSheet,  
  Text,   
  TouchableOpacity,  
  View,
  Alert  
} from 'react-native';  
  
import Main from '../../untils/Main'; 
import EditView from './Edit';
import MainScreen from '../MainFrame/MainScreen';
import NetUitl from '../../untils/NetUitl';
import LoadingView from '../../untils/LoadingView';
export default class LogonView extends Component {  
      
    constructor(props){  
      super(props);  
      this.state = {  
            userName: "",  
            password: "",
            showLoading:false
        };
    }   
    render() {
          return <View style={styles.loginview}>
              <Text style={styles.header} >京东登陆</Text>
              <View style={styles.headepend}>
              </View>
              <View style={{ marginTop: 0 }}>
                  <EditView name='用户名/邮箱/手机号' onChangeText={(text) => {
                    this.state.userName = text;
                  }} />
                  <EditView name='请输入密码' onChangeText={(text) => {
                    this.state.password = text;
                  }} />              
                 <TouchableOpacity onPress={()=>{this._pressButton()}} style={styles.loginTextView}>
                        <Text style={styles.loginText}> 登陆</Text>
                </TouchableOpacity>
                  <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={()=>{this._pressRegisterButton()}}>
                  <Text style={styles.register}>手机快速注册</Text>
                </TouchableOpacity>
                    
                      <Text style={styles.fgpwd}>忘记密码</Text>
                  </View>
              </View>
              <LoadingView showLoading={ this.state.showLoading } />
          </View>
      }
      
      _pressButton(){ 
        let formData = new FormData();
        formData.append("loginName",this.state.userName);
        formData.append("pwd",this.state.password);
        let url = "https://raw.githubusercontent.com/ColinXXT/Test/master/userInfo.json";
        NetUitl.postJson(url,formData,(responseText) => {
           if(Object.is(responseText.userName, this.state.userName) && Object.is(responseText.password, this.state.password)){
                this.onLoginSuccess();
              }else{
                this.onLoginError();
              }
        }) 
        this.setState({"showLoading":true});
    } 
    _pressRegisterButton(){ 
        Alert.alert('温馨提醒','功能完善中。。。');
    } 
      //跳转到第二个页面去
    onLoginSuccess(){
        const {navigator} = this.props;  
           if(navigator) {  
               navigator.push({  
                   name: 'MainScreen',  
                   component: MainScreen,  
                   /**页面间数据的传递 与将第二个页面如何将结果返回给第一个页面的方法 
                    *  
                    * 1.通过push,传递参数 
                    *   这里多出了一个 params 其实来自于<Navigator 里的一个方法的参数... 
                    *   id 
                    * 2.把上一个页面的实例或者回调方法，作为参数传递到当前页面来，在当前页面操作上一个页面的state 
                    */  
                   
                   params: {  
                       userName: this.state.userName,  
                       password:this.state.password
                   }        
               })  
           }  
            this.setState({"showLoading":false});
   }
   onLoginError(){
    Alert.alert('温馨提醒','请输入正确的帐号跟密码')
 }
}
const styles = StyleSheet.create({
    loginview: {
        flex: 1,
        padding: 30,
        backgroundColor: '#ffffff',
    },
    header: {
        color: "black", textAlign: 'center', marginTop: 10, height: 50
    },
    fgpwd: {
        color: "#4A90E2", textAlign: 'right', marginTop: 10,flex: 1
    },
    register: {
        color: "#4A90E2", textAlign: 'left', marginTop: 10,flex: 1
    },
    headepend:
    {
        flexDirection: 'row',
        height: 20,
        marginTop: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    loginText: {
        color: '#ffffff',
         fontWeight: 'bold',
         width:60,
      },
    loginTextView: {
        marginTop: 10,
        height:50,
        backgroundColor: '#3281DD',
        borderRadius:5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems:'center',
      },
});