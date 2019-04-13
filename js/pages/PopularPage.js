import React, {Component} from 'react';
import { StyleSheet, Text, View, FlatList, RefreshControl, ActivityIndicator} from 'react-native';
import { createMaterialTopTabNavigator, createAppContainer } from 'react-navigation';
import { connect } from 'react-redux';
import actions from '../action/index';
import PopularItem from '../common/PopularItem';
import Toast from 'react-native-easy-toast'
const URL = 'https://api.github.com/search/repositories?q=';
const SORT = '&sort=stars&order=desc';
const THEME_COLOR = 'red';
const pageSize = 10;

export default class PopularPage extends Component {
  constructor(props) {
    super(props);
    this.tabNames = ['Java', 'Android', 'ios', 'React', 'React Native', 'PHP'];
  }

  toTab() {
    const tabs = {};
    this.tabNames.forEach((item, index) => {
      tabs[`tab${index}`] = {
        screen: props => <PopularTabPage {...props} tabLabel={item}></PopularTabPage>,
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
class PopularTab extends Component {
  constructor(props){
    super(props)
    const {tabLabel} = this.props
    this.storeName = tabLabel
  }
  componentDidMount() {
    this.onLoadData()
  }
  onLoadData(loadMore) {
    const { onLoadRefresh , onLoadMore } = this.props
    const store = this._store();
    let storeName = this.storeName
    let url = this.createUrl(storeName)
    if (loadMore) {
      onLoadMore(storeName, ++store.pageIndex, pageSize, store.items, callBack(() => {
        this,refs.toast.show('没有更多了');
      }))
    } else {
      onLoadRefresh(storeName, url, pageSize)
    }
  }
  createUrl(storeName) {
    return URL + storeName + SORT;
  }
  renderItem({item}) {
    return(
      <PopularItem
        item={item}
        onSelect = {()=> {
        }}
      >
      </PopularItem>
    )
  }
  _store() {
    const { popular } = this.props;
    let store = popular[this.storeName];
    if (!store) {
      store = {
        items: [],
        isLoading: false,
        projectModes: [], // 要显示的数据
        hideLoadingMore: true, // 默认加载更多
      }
    }
    return store;
  }

  genIndicator() {
    return this._store().hideLoadingMore ? null :
      <View style={styles.indicatorContainer}>
        <ActivityIndicator
          style={styles.indicator}
        />
        <Text>正在加载更多</Text>
      </View>
  }

  render() {
    const { popular } = this.props;
    let store = this._store();
    return (
      <View>
      <FlatList
        data={store.projectModes}
        keyExtractor={item => "" + item.id}
        renderItem={data => this.renderItem(data)}
        refreshControl = {
          <RefreshControl
            title={'Loading'}
            titleColor={THEME_COLOR}
            colors={[THEME_COLOR]}
            refreshing={store.isLoading}
            onRefresh={() => this.onLoadData()}
            tintColor={THEME_COLOR}
          ></RefreshControl>
        }
        ListFooterComponent={() => this.genIndicator()}
        onEndReached={() => {
          console.log('---onEndReached----');
          setTimeout(() => {
            if (this.canLoadMore) {//fix 滚动时两次调用onEndReached https://github.com/facebook/react-native/issues/14015
              this.onLoadData(true);
              this.canLoadMore = false;
            }
          }, 100);
        }}
        onEndReachedThreshold={0.5}
        onMomentumScrollBegin={() => {
          this.canLoadMore = true; //fix 初始化时页调用onEndReached的问题
          console.log('---onMomentumScrollBegin-----')
        }}
      > 
      </FlatList>
      <Toast
        ref={'toast'}
        position={'center'}
      ></Toast>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  popular: state.popular
})

const mapDispatchToProps = dispatch => ({
  onLoadRefresh: (storeName, url, pageSize) => dispatch(actions.onRefreshPopular(storeName, url, pageSize)),
  onLoadMore: (storeName, pageIndex, pageSize, items, callBack) => dispatch(actions.onLoadMorePopular(storeName, pageIndex, pageSize, items, callBack))
})


const PopularTabPage = connect(mapStateToProps, mapDispatchToProps)(PopularTab)

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
