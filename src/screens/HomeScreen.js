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
    getYelpResults = () => {
        axios.get('https://api.yelp.com/v3/businesses/search', config)
        .then( response => {
            this.resultsArray = [];
            for (var i = 0; i < response.data.businesses.length; i++) {
                this.resultsArray.push({
                    id: i,
                    cardView_Title: response.data.businesses[i].name,
                    backgroundColor: '#4CAF50'
                })
            }
            this.setState({ Sample_CardView_Items_Array: this.resultsArray, No_More_CardView: false });
            // this.createStackOfCards();
        }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
        this.render();
    }

    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        this.state = { Sample_CardView_Items_Array: [
            {
                id: '1',
                cardView_Title: "Loading"
            }
        ]}
        this.getYelpResults();
    }

    componentDidMount(){
        if (this.state.Sample_CardView_Items_Array != null) {
            if (this.state.Sample_CardView_Items_Array.length == 0) {
                this.setState({ No_More_CardView: true });
            }
            else {
                this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array.reverse() });
            }
        }
        else {
            this.setState({ No_More_CardView: true });
        }
    }

    removeCardView =(id)=> {
        if (this.state.Sample_CardView_Items_Array != null) {
            if (this.state.Sample_CardView_Items_Array.length == 0 ) {
                this.setState({ No_More_CardView: true });
            }
            else {
                this.state.Sample_CardView_Items_Array.splice( this.state.Sample_CardView_Items_Array.findIndex( x => x.id == id ), 1 );
                this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array }, () => {
                    if( this.state.Sample_CardView_Items_Array.length == 0 ){
                        this.setState({ No_More_CardView: true });
                    }
                });
            }
        }
        else {
            this.setState({ No_More_CardView: true });
        }
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
    CardView_Title: {
        color: '#fff',
        fontSize: 24
    }
});
