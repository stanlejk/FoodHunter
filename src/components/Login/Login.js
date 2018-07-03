import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView } from 'react-native';
import LoginForm from './LoginForm'

export default class Login extends Component {
    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={ require('../../images/logo.png') }
                    />
                    <Text style={styles.title}>FoodHunter</Text>
                    <Text style={styles.subtitle}>Like Tinder, for food!</Text>
                </View>
                <View style={styles.formContainer}>
                    <LoginForm />
                </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#596275',
        flex: 1
    },
    logoContainer: {
        alignItems: 'center',
        flexGrow: 1,
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100
    },
    title: {
        marginTop: 10,
        color: '#ffffff'
    },
    subtitle: {
        color: '#ffffff',
        opacity: .75
    }
});
