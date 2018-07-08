import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, KeyboardAvoidingView, StatusBar, TextInput } from "react-native";

class LoginScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
          email: '',
          nameValidate: 'false',
          password: '',
          passwordValidate: 'false'
        }
    }

    static navigationOptions = {
        header: null
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <View style={styles.logoContainer}>
                    <Image
                        style={styles.logo}
                        source={ require('../images/logo.png') }
                    />
                    <Text style={styles.title}>FoodHunter</Text>
                    <Text style={styles.subtitle}>Like Tinder, for food!</Text>
                </View>
                <View style={styles.formContainer}>
                    <View behavior={'padding'} style={styles.formInnerContainer}>
                        <StatusBar barStyle="light-content" />
                        <TextInput
                            placeholder="Username"
                            onChangeText={(text)=>this.validate(text, 'username')}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            returnKeyType="next"
                            onSubmitEditing={() => this.passwordInput.focus()}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoCorrect={false}
                            style={[styles.input, !this.state.nameValidate? styles.error:null]}
                        />
                        <TextInput
                            placeholder="Password"
                            onChangeText={(text)=>this.validate(text, 'password')}
                            placeholderTextColor="rgba(255,255,255,0.7)"
                            secureTextEntry
                            returnKeyType="go"
                            style={[styles.input, !this.state.passwordValidate? styles.error:null]}
                            ref={(input) => this.passwordInput = input}
                        />
                        <TouchableOpacity
                            style={styles.buttonContainer}
                            onPress={()=>this.props.navigation.navigate('Home')}>
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }

    validate(text, type) {
        alph=/^[a-zA-Z]+$/;
        if (type=='username'){
            if (text == "user") {
                this.setState({
                    nameValidate: true,
                })
            }
            else {
                this.setState({
                    nameValidate: false,
                })
            }
        }
        else if (type=='password') {
            if (text == "pass") {
                this.setState({
                    passwordValidate: true,
                })
            }
            else {
                this.setState({
                    passwordValidate: false,
                })
            }
        }
    }
}
export default LoginScreen;

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
    },
    formInnerContainer: {
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 10,
        color: '#FFFFFF',
        paddingHorizontal: 10
    },
    buttonContainer: {
        backgroundColor: '#ff6b81',
        paddingVertical: 15,
        marginBottom: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: '700'
    }
});
