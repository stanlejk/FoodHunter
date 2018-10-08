import React, { Component } from "react";
import Icon from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from 'react-navigation';

import HomeScreen from './HomeScreen.js';
import FavoriteListScreen from './FavoriteListScreen.js';

// TAB NAVIGATION
const HomeTabs = createBottomTabNavigator(
    {
        'Home': {
            screen: HomeScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="md-home" size={ 24 } />
                )
            }
        },
        'Favorites': {
            screen: FavoriteListScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <Icon name="md-heart" size={ 24 } />
                )
            }
        }
    },
    {
        tabBarOptions: {
            showLabel: false
        }
    }
);

HomeTabs.navigationOptions = {
    header: null
};

export default HomeTabs;
