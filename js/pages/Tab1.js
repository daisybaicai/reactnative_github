import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';

type Props = {};
import NavigatorUtil from '../navigator/NavigationUtil'
export default class Tab1 extends Component <Props> {
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
});
