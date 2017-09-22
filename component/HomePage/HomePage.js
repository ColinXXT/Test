/**
 * Created by Colin
 */
'use strict';
import React, { Component } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Alert,
    ListView,
    RefreshControl,
    Dimensions,
    PixelRatio,
    TouchableWithoutFeedback
} from 'react-native';
import ViewPager from 'react-native-viewpager';
import MenuButton from '../MainFrame/MenuButton';
import Header from './Header';
import NetUitl from '../../untils/NetUitl';
const BANNER_IMGS = [
    require('../../images/banner/1.jpg'),
    require('../../images/banner/2.jpg'),
    require('../../images/banner/3.jpg'),
    require('../../images/banner/4.jpg')
];

const len = 160;

export default class HomePage extends Component {

    constructor(props) {
        super(props);

        // 用于构建DataSource对象
        var dataSource = new ViewPager.DataSource({
            pageHasChanged: (p1, p2) => p1 !== p2,
        });
        this._onMenuClick = this._onMenuClick.bind(this);
        this._onRecommendClick = this._onRecommendClick.bind(this);
        this._renderRow = this._renderRow.bind(this);
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        // 实际的DataSources存放在state中
        this.state = {
            dataSource: dataSource.cloneWithPages(BANNER_IMGS),
            listData: ds
        }
    }
//请求之前 componentWillMount
    componentWillMount() {
        //发送request get 数据
          let formData = new FormData();
          let url='https://raw.githubusercontent.com/ColinXXT/Test/master/Jd.json';
          NetUitl.postJson(url,formData,(responseText) => {
              console.log(responseText);
            var arr = responseText.recommend.wareInfoList;
            var rows = [];
        //ES6
            for (let i = 0; i < arr.length; i += 2) {
                var item = {id: i, left: null, right: null};
                item.left = (arr[i]);
                if (i < arr.length - 1) {
                    item.right = (arr[i + 1]);
                }
                rows.push(item);
            }
            console.debug(rows);
            var ds = this.state.listData.cloneWithRows(rows);
            this.setState({listData: ds});
         }) 
        
}

    _renderPage(data, pageID) {
        return (
            <Image
                source={data}
                style={styles.page}/>
        );
    }
    
    _onMenuClick(title, tag) {
        Alert.alert('提示', '你点击了:' + title + " Tag:" + tag);
    }

    _onRecommendClick(wareId) {
        console.info(wareId);
        let url = 'http://item.m.jd.com/product/' + wareId + '.html';
        console.info(url);
        Alert.alert('提示', '你点击了:' + wareId + " 号商品，服务升级中，请访问此链接获取更多信息 " + url);
       
    }

    _renderRow(rowData) {
        return (
            //
           
            <View style={{flexDirection:'row'}}>
                
                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.left.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={require('../../images/goods/pc.jpg')}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.left.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.left.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback style={{flex:1,alignItems:'center'}}
                                          onPress={()=>{this._onRecommendClick(rowData.right.wareId)}}>
                    <View style={{flex:1,alignItems:'center'}}>
                        <Image resizeMode={'stretch'} source={require('../../images/goods/bz.jpg')}
                               style={{width:len,height:len}}/>
                        <Text numberOfLines={2} style={styles.recommendTitle}>{rowData.right.wname}</Text>
                        <View style={{width:len,borderWidth:0.5,borderColor:'#d7d7d7'}}/>
                        <View
                            style={{flexDirection:'row',width:len, marginTop: 6, marginBottom: 22,alignItems:'flex-start'}}>
                            <Text style={styles.priceText}>￥{rowData.right.jdPrice}</Text>
                            <TouchableWithoutFeedback>
                                <View style={{width:50,height:18,borderWidth:1,borderColor:'#999999',borderRadius:3,justifyContent: 'center',
alignItems: 'center'}}>
                                    <Text
                                        style={{color:'#999999',fontSize:12,textAlign:'center'}}>看相似</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }

    render() {
        return (
            // 根据数据源实例化一个ListView
            <ListView
                style={{flex:1,backgroundColor:'white'}}
                // 获取数据源
                dataSource={this.state.listData}
                // 根据数据源创建一个Item
                // 注：这里的this.renderRow是隐式写法，系统会根据函数的需要，将对应的参数传递过去（共有4个参数：rowData, sectionID, rowID, highlightRow
                renderRow={this._renderRow}
                renderHeader={()=>{return(
                <View>
                <Header/>
                    <ViewPager
                        style={{height:130}}
                        dataSource={this.state.dataSource}
                        renderPage={this._renderPage}
                        isLoop={true}
                        autoPlay={true}/>
                        <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../../images/home_icons/wdgz.png')}
                                    showText={'我的关注'} tag={'wdgz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/wlcx.png')}
                                    showText={'物流查询'} tag={'wlcx'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/cz.png')}
                                    showText={'充值'} tag={'cz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/dyp.png')}
                                    showText={'电影票'} tag={'dyp'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={styles.menuView}>
                        <MenuButton renderIcon={require('../../images/home_icons/yxcz.png')}
                                    showText={'游戏充值'} tag={'yxcz'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/xjk.png')}
                                    showText={'小金库'} tag={'xjk'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/ljd.png')}
                                    showText={'领京豆'} tag={'ljd'}
                                    onClick={this._onMenuClick}/>
                        <MenuButton renderIcon={require('../../images/home_icons/gd.png')}
                                    showText={'更多'} tag={'gd'}
                                    onClick={this._onMenuClick}/>
                    </View>
                    <View style={{marginTop:15,borderWidth:0.5,borderColor:'#ccc'}}/>
                    <Text style={{color:'#7f7f7f',fontSize:12,padding:10}}>猜你喜欢</Text>
                </View>)}}>
            </ListView>
        )
    }
}
const styles = StyleSheet.create({
    page: {
        flex: 1,
        height: 130,
        resizeMode: 'stretch'
    },
    menuView: {
        flexDirection: 'row',
        marginTop: 10
    },
    recommendTitle: {
        width: len,
        flexWrap: 'wrap',
        fontSize: 12,
        color: 'black',
        flex: 1,
        marginTop: 8,
        marginBottom: 8,
        height: 30
    },
    priceText: {
        flex: 1,
        alignSelf: 'flex-start',
        textAlign: 'left',
        fontSize: 13,
        color: '#f15353'
    }
});
