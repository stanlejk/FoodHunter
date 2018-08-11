import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    Dimensions,
    Animated,
    PanResponder
} from "react-native";
import SwipeableCardView from '../components/SwipeableCardView';
import axios from 'axios';

const API_KEY = '';

const config = {
    headers: {'Authorization': 'Bearer ' + API_KEY},
    params: {
        term: 'tacos',
        location: 'main 123st'
    }
};

class HomeScreen extends React.Component {
    componentWillMount() {
        axios.get('https://api.yelp.com/v3/businesses/search', config)
        .then(response => console.log(response)).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
    }

    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        this.state = { Sample_CardView_Items_Array: [
            {
                id: '1',
                cardView_Title: 'CardView 1',
                backgroundColor: '#4CAF50'
            },
            {
                id: '2',
                cardView_Title: 'CardView 2',
                backgroundColor: '#607D8B'
            },
            {
                id: '3',
                cardView_Title: 'CardView 3',
                backgroundColor: '#9C27B0'
            },
            {
                id: '4',
                cardView_Title: 'CardView 4',
                backgroundColor: '#00BCD4'
            },
            {
                id: '5',
                cardView_Title: 'CardView 5',
                backgroundColor: '#FFC107'
            }], No_More_CardView: false };
    }

    componentDidMount(){
        this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array.reverse() });
        if( this.state.Sample_CardView_Items_Array.length == 0 ){
            this.setState({ No_More_CardView: true });
        }
    }

    removeCardView =(id)=> {
        this.state.Sample_CardView_Items_Array.splice( this.state.Sample_CardView_Items_Array.findIndex( x => x.id == id ), 1 );
        this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array }, () => {
            if( this.state.Sample_CardView_Items_Array.length == 0 ){
                this.setState({ No_More_CardView: true });
            }
        });
    }

    render(){
        return(
            <View style = { styles.MainContainer }>
                {
                    this.state.Sample_CardView_Items_Array.map(( item, key ) => ( <SwipeableCardView key = { key } item = { item } removeCardView = { this.removeCardView.bind( this, item.id ) }/> ))
                }
                {
                    ( this.state.No_More_CardView ) ? ( <Text style = {{ fontSize: 22, color: '#000' }}>No More CardViews Found.</Text> ) : null
                }
            </View>
        );
    }
}

export default HomeScreen;

const styles = StyleSheet.create({
    MainContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    cardView_Style: {
        width: '75%',
        height: '45%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        borderRadius: 7
    },
    CardView_Title: {
        color: '#fff',
        fontSize: 24
    },
    Left_Text_Style: {
        top: 22,
        right: 32,
        position: 'absolute',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    Right_Text_Style:{
        top: 22,
        left: 32,
        position: 'absolute',
        color: '#fff',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }
});
