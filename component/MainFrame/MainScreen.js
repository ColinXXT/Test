/**
  * Created by Colin.
  */
 'use strict';
 import React, { Component } from 'react';
 import  {
    StyleSheet,
    Image,
    Text,
    View,
    Navigator
 } from 'react-native';
 import HomePage from '../HomePage/HomePage';
 import Category from '../Category/Category';
 import Finding from '../Finding/Finding';
 import Cart from '../Cart/Cart';
 import Personal from '../Personal/Personal';
 import TabNavigator from 'react-native-tab-navigator'; 
 const HOME = 'Home';
 const HOME_NORMAL = require('../../images/tabs/home_normal.png');
 const HOME_FOCUS = require('../../images/tabs/home_focus.png');
 const CATEGORY = 'Category';
 const CATEGORY_NORMAL = require('../../images/tabs/category_normal.png');
 const CATEGORY_FOCUS = require('../../images/tabs/category_focus.png');
 const FAXIAN = 'Founding';
 const FAXIAN_NORMAL = require('../../images/tabs/faxian_normal.png');
 const FAXIAN_FOCUS = require('../../images/tabs/faxian_focus.png');
 const CART = 'Cart';
 const CART_NORMAL = require('../../images/tabs/cart_normal.png');
 const CART_FOCUS = require('../../images/tabs/cart_focus.png');
 const PERSONAL = 'Personal';
 const PERSONAL_NORMAL = require('../../images/tabs/personal_normal.png');
 const PERSONAL_FOCUS = require('../../images/tabs/personal_focus.png');
 export default class MainScreen extends Component {
    constructor(props) {
        super(props);
        //默认值 初始status 由于在onPress函数中调用了this.setState，所以必须在类的使用构造函数，并对state进行初始化：
        this.state = {
            selectedTab: HOME
        };
        
    }
   /*
    TabNavigator 属性
    sceneStyle：场景样式，即Tab页容器的样式，可按View的style设置
    tabBarStyle：TabBar的样式，基本也可按照普通的style写法进行设置
    tabBarShadowStyle：TabBar阴影的样式，不过对于扁平化的设计，这个属性应该用处不大
    hidesTabTouch：bool类型，即是否隐藏Tab按钮的按下效果
   */
     render() {
         return (
             <View style={{flex:1}}>
                    <TabNavigator hidesTabTouch={true} tabBarStyle={styles.tab}>  
                        {this._renderTabItem(HOME_NORMAL, HOME_FOCUS, HOME, <HomePage nav={this.props}/>)}
                        {this._renderTabItem(CATEGORY_NORMAL, CATEGORY_FOCUS, CATEGORY, <Category nav={this}/>)} 
                        {this._renderTabItem(FAXIAN_NORMAL, FAXIAN_FOCUS, FAXIAN, <Finding nav={this}/>)} 
                        {this._renderTabItem(CART_NORMAL, CART_FOCUS, CART, <Cart nav={this}/>)} 
                        {this._renderTabItem(PERSONAL_NORMAL, PERSONAL_FOCUS, PERSONAL, <Personal nav={this.props}/>)} 
                    </TabNavigator>
             </View>
         );
     }
  /*
    封装tabBarItem  在iOS中可能以UIView呈现，而在React Native中，则是一个<View>，我们可以自己义，也可以直接放置其他控件。 
    renderIcon: 必填项，即图标，但为function类型，所以这里需要用到Arrow Function
    renderSelectedIcon: 选中状态的图标，非必填，也是function类型
    badgeText: 即Tab右上角的提示文字，可为String或Number，类似QQ中Tab右上角的消息提示，非必填
    renderBadge: 提示角标渲染方式，function类型，类似render的使用，非必填
    title: 标题，String类型，非必填
    titleStyle: 标题样式，style类型，非必填
    selectedTitleStyle: 选中标题样式，style类型，非必填
    selected: bool型，是否选中状态，可使用setState进行控制，默认false
    onPress: function型，即点击事件的回调函数，这里需要控制的是state，而切换页面已经由控件本身帮我们实现好了
    allowFontScaling: bool型，是否允许字体缩放，默认false
   */         
     _renderTabItem(img, selectedImg, tag, childView) {  
        return (   
            <TabNavigator.Item  
                selected={this.state.selectedTab === tag}  
                renderIcon={() => <Image style={styles.tabIcon} source={img}/>}  
                renderSelectedIcon={() => <Image style={styles.tabIcon} source={selectedImg}/>}  
                onPress={() => this.setState({ selectedTab: tag })}>  
                {childView}  
            </TabNavigator.Item>  
        );  
    } 
 }

  /*
    resizeMode: 
    cover：模式只求在显示比例不失真的情况下填充整个显示区域。可以对图片进行放大或者缩小，超出显示区域的部分不显示， 也就是说，图片可能部分会显示不了。
    contain：模式是要求显示整张图片, 可以对它进行等比缩小, 图片会显示完整,可能会露出Image控件的底色。 如果图片宽高都小于控件宽高，则不会对图片进行放大。
    stretch：模式不考虑保持图片原来的宽,高比.填充整个Image定义的显示区域,这种模式显示的图片可能会畸形和失真。
    center：模式, 9月11号的0.33版本才支持，contain模式基础上支持等比放大。
   */ 
const styles = StyleSheet.create({  
    tab: {  
        height: 52,  
        backgroundColor: '#333333',  
        alignItems: 'center'  
    }, 
    tabIcon: {  
        width: 30,  
        height: 35,  
        resizeMode: 'stretch',  
        marginTop: 10  
    }
});
