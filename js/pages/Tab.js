import React,{ Component } from 'react';
import {
    createBottomTabNavigator,
    createAppContainer,
    BottomTabBar
} from 'react-navigation';
import {connect} from 'react-redux';
import FavoritePage from './FavoritePage';
import MyPage from './MyPage';
import PopularPage from './PopularPage';
import TrendingPage from './TrendingPage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const _tab = {
    FavoritePage: {
        screen: FavoritePage,
        navigationOptions: {
            tabBarLabel: "收藏",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'favorite'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    MyPage: {
        screen: MyPage,
        navigationOptions: {
            tabBarLabel: "我的",
            tabBarIcon: ({tintColor, focused}) => (
                <FontAwesome
                    name={'user'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }        
    },
    PopularPage: {
        screen: PopularPage,
        navigationOptions: {
            tabBarLabel: "最热",
            tabBarIcon: ({tintColor, focused}) => (
                <MaterialIcons
                    name={'whatshot'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }
    },
    TrendingPage: {
        screen: TrendingPage,
        navigationOptions: {
            tabBarLabel: "趋势",
            tabBarIcon: ({tintColor, focused}) => (
                <Ionicons
                    name={'md-trending-up'}
                    size={26}
                    style={{color: tintColor}}
                />
            )
        }   
    }    
}

export  class DynamicTabNavigator extends Component{
    _tabNavigator() {
        if (this.Tabs) {
            return this.Tabs;
        }
        const {PopularPage, TrendingPage, FavoritePage, MyPage} = _tab;
        const tabs = {PopularPage, TrendingPage, FavoritePage, MyPage };//根据需要定制显示的tab
        PopularPage.navigationOptions.tabBarLabel = '最热';//动态配置Tab属性
        return this.Tabs = createAppContainer(createBottomTabNavigator(tabs, {
                tabBarComponent: props => {
                    return <TabBarComponent theme={this.props.theme} {...props}/>
                }
            }
        ))
    }
    render(){
        const Tab = this._tabNavigator()
        return(
            <Tab></Tab>
        )
    }
}

class TabBarComponent extends Component {
    constructor(props) {
        super(props);
        this.theme = {
            tintColor: props.activeTintColor,
            updateTime: new Date().getTime(),
        }
    }

    render() {
        return <BottomTabBar
            {...this.props}
            activeTintColor={this.props.theme}
        />
    }
}

const mapStateToProps = state => ({
    theme: state.theme.theme,
});

export default connect(mapStateToProps)(DynamicTabNavigator);