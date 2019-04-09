/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';
import {
    createMaterialTopTabNavigator, createAppContainer
} from 'react-navigation';

import Tab1 from './Tab1';

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = ['Java', 'Android', 'ios', 'React', 'React Native', 'PHP'];
  }

  toTab() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: Tab1,
        navigationOptions: {
          title: item
        }
      }
    })
    return tabs;
  }

  render() {
    const tabs = this.toTab();
    const TabNavigator = createAppContainer(createMaterialTopTabNavigator(tabs, {
      tabBarOptions: {
          tabStyle: styles.tabStyle,
          upperCaseLabel: false,//是否使标签大写，默认为true
          scrollEnabled: true,//是否支持 选项卡滚动，默认false
          style: {
              backgroundColor: '#678',//TabBar 的背景颜色
              height: 30//fix 开启scrollEnabled后再Android上初次加载时闪烁问题
          },
          indicatorStyle: styles.indicatorStyle,//标签指示器的样式
          labelStyle: styles.labelStyle,//文字的样式
      }
    }));
    return (
      <TabNavigator></TabNavigator>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  tabStyle: {
    // minWidth: 50 //fix minWidth会导致tabStyle初次加载时闪烁
    padding: 0
  },
  indicatorStyle: {
    height: 2,
    backgroundColor: 'white'
  },
  labelStyle: {
    fontSize: 13,
    margin: 0,
  },
  indicatorContainer: {
    alignItems: "center"
  },
  indicator: {
    color: 'red',
    margin: 10
  }
});
