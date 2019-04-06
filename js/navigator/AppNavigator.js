import { createStackNavigator, createSwitchNavigator, createAppContainer } from 'react-navigation';

import WelcomePage from '../pages/WelcomePage'
import DetailPage from '../pages/DetailPage'
import HomePage from '../pages/HomePage'

const MainNavigator = createStackNavigator({ HomePage: HomePage, DetailPage: DetailPage });
const InitNavigator = createStackNavigator({ WelcomePage: WelcomePage });

export default createAppContainer(createSwitchNavigator(
  {
    Init: InitNavigator,
    Main: MainNavigator,
  },
  {
    initialRouteName: 'Init',
  }
));
