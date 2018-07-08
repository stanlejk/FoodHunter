import React, { Component } from 'react';
import { StyleSheet, View, TextInput, TouchableOpacity, Text, StatusBar } from 'react-native';

export default class LoginForm extends Component {

    constructor(props) {
        super(props);

        this.state = {
          email: '',
          nameValidate: 'true',
          password: '',
          passwordValidate: 'false'
        }
    }

    validate(text, type) {
        alph=/^[a-zA-Z]+$/;
        if (type=='username'){
            if (text == "stanleyjkim") {
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
            if (text == "j00nhakim") {
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

    render() {
        return (
            <View behavior={'padding'} style={styles.container}>
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
                    onPress={()=>this.props.screenProps.navigation.navigate('Home')}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
            </View>
        )
    }


}

const styles = StyleSheet.create({
    container: {
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
    },
    error: {
        borderWidth: 2,
        borderColor: 'red'
    }
});
