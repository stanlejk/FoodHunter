import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation'; // Navigation version 2.11.2
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';

import HomeTabs from './src/screens/HomeTabNavigator.js';

export default class App extends React.Component {
    render() {
        return (
            <AppStackNavigator />
        );
    }
}

// STACK NAVIGATION
const AppStackNavigator = createStackNavigator({
    Login: LoginScreen,
    Home: HomeTabs
});

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
