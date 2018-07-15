import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import axios from 'axios';

const API_KEY = '';

const config = {
    headers: {'Authorization': 'Bearer ' + API_KEY},
    params: {
        term: 'tacos',
        location: 'main 123st'
    }
};

export default class App extends React.Component {
    componentWillMount() {
        axios.get('https://api.yelp.com/v3/businesses/search', config)
        .then(response => console.log(response)).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }

    render(){
        return (
            <View>
                <Text> My first yelp authentication request </Text>
            </View>
        );
    }

    // render() {
    //     return (
    //         <AppStackNavigator />
    //     )
    // }
}

const AppStackNavigator = createStackNavigator({
    Login: LoginScreen,
    Home: HomeScreen
})

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
