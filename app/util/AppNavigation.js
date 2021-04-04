/*
Ekranların ekleneceği sayfa
*/
import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import ListScreen from '../screens/ListScreen';
import LoginPage from '../screens/LoginPage';
import MyLoveScreen from '../screens/MyLoveScreen';
import {createNavigationReducer, createReactNavigationReduxMiddleware} from 'react-navigation-redux-helpers';


const AppNavigator = createStackNavigator(
  {
    List: ListScreen,
    Login: LoginPage,
    MyLove: MyLoveScreen,
  },
  {
    initialRouteName: 'Login',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export const routerReducer = createNavigationReducer(AppNavigator);

export const routerMiddleware = createReactNavigationReduxMiddleware(
    state => state.nav
);

export default createAppContainer(AppNavigator);
