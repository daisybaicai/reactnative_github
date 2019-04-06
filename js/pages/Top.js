import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

const instructions = Platform.select({
  ios: 'Press Cmd+R to reload,\n' + 'Cmd+D or shake for dev menu',
  android:
    'Double tap R on your keyboard to reload,\n' +
    'Shake or press menu button for dev menu',
});

import {
    createMaterialTopTabNavigator, createAppContainer
} from 'react-navigation';
import NavigatorUtil from '../navigator/NavigationUtil'
type Props = {};
import Tab1 from './Tab1';
import Tab2 from './Tab2';
const TabNavigator = createMaterialTopTabNavigator({
    PopularTab1: {
        screen: Tab1,
        navigationOptions: {
            tabBarLabel: "tab1"
        }
    },
    PopularTab2: {
        screen: Tab2,
        navigationOptions: {
            tabBarLabel: "tab2"
        }
    }
});

class PopularTab1 extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage1</Text>
        <Text onPress={() => {
            NavigatorUtil.goPage({
                navigation: this.props.navigation
            }, "DetailPage")
        }}>跳转到详情页</Text>
      </View>
    );
  }
}

class PopularTab2 extends Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>PopularPage2</Text>
      </View>
    );
  }
}
export default createAppContainer(TabNavigator);