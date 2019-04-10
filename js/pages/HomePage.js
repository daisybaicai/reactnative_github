import React, {Component} from 'react';
import {BackHandler} from "react-native";
import {NavigationActions} from "react-navigation";
import {connect} from 'react-redux';
import Tab from './Tab'
import NaivgationUtil from '../navigator/NavigationUtil';


export  class HomePage extends Component  {
  componentDidMount() {
        BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
    }

    /**
     * 处理 Android 中的物理返回键
     * https://reactnavigation.org/docs/en/redux-integration.html#handling-the-hardware-back-button-in-android
     * @returns {boolean}
     */
    onBackPress = () => {
        const {dispatch, nav} = this.props;
        //if (nav.index === 0) {
        if (nav.routes[1].index === 0) {//如果RootNavigator中的MainNavigator的index为0，则不处理返回事件
            return false;
        }
        dispatch(NavigationActions.back());
        return true;
    };

  render() {
    NaivgationUtil.navigation = this.props.navigation;
    return (
      <Tab></Tab>
    );
  }
}

const mapStateToProps = state => ({
  nav: state.nav,
});

export default connect(mapStateToProps)(HomePage);