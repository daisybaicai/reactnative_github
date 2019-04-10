import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';
import {connect} from 'react-redux';
import {createReactNavigationReduxMiddleware, createReduxContainer} from 'react-navigation-redux-helpers';

import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'

export const rootCom = 'Init'; //设置根路由

const MainNavigator = createStackNavigator({
  HomePage: {
    screen:HomePage,
    navigationOptions: {
      header: null
    }
  },
  DetailPage: {
    screen:DetailPage
  }
});
const InitNavigator = createStackNavigator({
   WelcomePage: {
    screen:WelcomePage,
    navigationOptions: {
      header: null
    }
  }
});

export const RootNavigator = createAppContainer(createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Init',
  }
));

/**
 * 1.初始化react-navigation与redux的中间件，
 * 该方法的一个很大的作用就是为reduxifyNavigator的key设置actionSubscribers(行为订阅者)
 * 设置订阅者@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L29
 * 检测订阅者是否存在@https://github.com/react-navigation/react-navigation-redux-helpers/blob/master/src/middleware.js#L97
 * @type {Middleware}
 */
export const middleware = createReactNavigationReduxMiddleware(
    state => state.nav,
    'root'
);

/**
 * 2.将根导航器组件传递给 reduxifyNavigator 函数,
 * 并返回一个将navigation state 和 dispatch 函数作为 props的新组件；
 * 注意：要在createReactNavigationReduxMiddleware之后执行
 */
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');

/**
 * State到Props的映射关系
 * @param state
 */
const mapStateToProps = state => ({
  state: state.nav, //v2
});
/**
 * 3.连接 React 组件与 Redux store
 */
export default connect(mapStateToProps)(AppWithNavigationState);


/**
注意注意： 使用了react - navigation - redux - helpers3 .0 的同学请注意！！！

  1. reduxifyNavigator被改名为createReduxContainer， 所以：

import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator
} from 'react-navigation-redux-helpers';
//改为
import {
  createReactNavigationReduxMiddleware,
  createReduxContainer
} from 'react-navigation-redux-helpers';
...
const AppWithNavigationState = reduxifyNavigator(RootNavigator, 'root');
//改为
const AppWithNavigationState = createReduxContainer(RootNavigator, 'root');
2. createReactNavigationReduxMiddleware的参数顺序发生了变化：

export const middleware = createReactNavigationReduxMiddleware(
  'root',
  state => state.nav
);
//改为
export const middleware = createReactNavigationReduxMiddleware(
  state => state.nav,
  'root'
);
 */