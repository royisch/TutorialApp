import React from 'react';
//import Icon from 'react-native-vector-icons/dist/FontAwesome';
import { StackNavigator } from 'react-navigation';
import SearchPage from './src/components/Search';
import NewsFeed from './src/components/NewsFeed';

export const Root = StackNavigator({
  Home: {
    screen: SearchPage,
    navigationOptions: {
      headerTitle: 'SEARCH',
      headerStyle: {
        backgroundColor: '#3399cc'
      }
    }
  },
  Feed: {
    screen: NewsFeed,
    navigationOptions: ({ navigation }) => ({
      headerTitle: 'NEWS FEED',
      headerRight: null,
      //headerLeft: <Icon isAppLevelLogin onPress={() => navigation.goBack()} name={'close'} size={15} />,
      headerStyle: {
        backgroundColor: '#fff'
      },
      gesturesEnabled: false
    })
  }
});

