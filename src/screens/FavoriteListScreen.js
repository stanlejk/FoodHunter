import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

class FavoriteListScreen extends React.Component {

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <Text>FavoriteListScreen</Text>
        );
    }
}
export default FavoriteListScreen;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#596275',
        flex: 1
    }
});
