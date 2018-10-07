import React, { Component } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Platform,
    Dimensions,
    Animated,
    PanResponder,
    StatusBar,
    TouchableOpacity
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SwipeableCardView from '../components/SwipeableCardView';
import axios from 'axios';

const API_KEY = 'eXudXOEJTDzPWAIxbrcEHFPtR5kg4tB-gaRUppONeUvsgbXvoqVfa3wgotT2Zqyo1u47BzHDwwPmwLgfaPMOQ3IPaMmcin0VNYzjeCF3yrVQkewbcs9K25mkzeFGW3Yx';

class HomeScreen extends React.Component {

    // Uses geolocation API to get user's latitude and longitude
    getUserLocation = () => {
        // Call getCurrentPosition
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Set lat and long in state
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.getYelpResults();
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000 },
        );
    }

    // Call to Yelp API to generate restaurant list
    getYelpResults = () => {
        // Config variable to call yelp API based on location
        var config = {
            headers: {'Authorization': 'Bearer ' + API_KEY},
            params: {
                term: 'tacos',
                latitude: this.state.latitude,
                longitude: this.state.longitude
            }
        };
        // Use axios to retrieve response from API
        axios.get('https://api.yelp.com/v3/businesses/search', config)
        .then( response => {
            console.log(response);
            // Array to carry results of API Call
            this.resultsArray = [];
            // Iterate through businesses returned by Yelp API
            for (var i = 0; i < response.data.businesses.length; i++) {
                // Instantiate object for the rating and # of reviews
                var businessRatingObj = {
                    rating: response.data.businesses[i].rating,
                    numOfRatings: response.data.businesses[i].review_count
                }
                // Then push the business' info as an object into the array
                this.resultsArray.push({
                    id: i,
                    cardView_Title: response.data.businesses[i].name,
                    mainImage: response.data.businesses[i].image_url,
                    ratingObj: businessRatingObj,
                    pricing: response.data.businesses[i].price,
                    categories: response.data.businesses[i].categories
                })
            }
            // Set the result array in the state
            this.setState({ Sample_CardView_Items_Array: this.resultsArray, No_More_CardView: false });
        }).catch((error)=>{
            console.log("Api call error");
            alert(error.message);
        });
        // After results are generated, render the home screen
        this.render();
    }

    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        // Temporary placeholder to avoid the app crashing
        this.state = {
            Sample_CardView_Items_Array: [{
                id: '1',
                cardView_Title: "Loading",
                ratingObj: {
                    rating: 0,
                    numOfRatings: 0
                }
            }],
            latitude: null,
            longitude: null,
            error: null
        };
        // Grab user's location and set in state, then generate results from Yelp API call
        this.getUserLocation();
    }

    // Sets the CardView Array in the state
    componentDidMount(){
        // If the Yelp results have been generated
        if (this.state.Sample_CardView_Items_Array != null) {
            // Checks if the array has no items
            if (this.state.Sample_CardView_Items_Array.length == 0) {
                // Set state to not display cardviews
                this.setState({ No_More_CardView: true });
            }
            // Reverses the items in the array to view restaurants from top to bottom
            else {
                this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array.reverse() });
            }
        }
        // Don't display cardviews
        else {
            this.setState({ No_More_CardView: true });
        }
    }

    //
    removeCardView =(id)=> {
        // If the Yelp results have been generated
        if (this.state.Sample_CardView_Items_Array != null) {
            // Checks if the array has no items
            if (this.state.Sample_CardView_Items_Array.length == 0 ) {
                // Set state to not display cardviews
                this.setState({ No_More_CardView: true });
            }
            // Reverses the items in the array to view restaurants from top to bottom
            else {
                // Remove the cardview at the index passed in from the array
                this.state.Sample_CardView_Items_Array.splice( this.state.Sample_CardView_Items_Array.findIndex( x => x.id == id ), 1 );
                // Update the state with the updated array
                this.setState({ Sample_CardView_Items_Array: this.state.Sample_CardView_Items_Array }, () => {
                    // If the length of updated array is 0
                    if( this.state.Sample_CardView_Items_Array.length == 0 ){
                        // Don't display cardviews
                        this.setState({ No_More_CardView: true });
                    }
                });
            }
        }
        // Don't display cardviews
        else {
            this.setState({ No_More_CardView: true });
        }
    }

    render(){
        console.log(this.state.latitude + " " + this.state.longitude);
        return(
            // Container
            <View style = { styles.MainContainer }>
                <StatusBar
                    barStyle="dark-content"
                />
                {
                    // Generate SwipeableCardViews using the array in the state
                    this.state.CardViewArray = this.state.Sample_CardView_Items_Array.map((item, key) => (
                        <SwipeableCardView
                            key={ key }
                            item={ item }
                            removeCardView={ this.removeCardView.bind(this, item.id) }
                        />
                    ))
                }
                {
                    // Displays message if no more cardviews exist in stack
                    ( this.state.No_More_CardView ) ? ( <Text style = {{ fontSize: 22, color: '#000' }}>No More CardViews Found.</Text> ) : null
                }
                // Dislike Button /* TO DO */
                <TouchableOpacity style={ styles.DislikeButtonStyle }>
                    <Icon name="md-trash" size={ 40 } color="#FFFFFF"/>
                </TouchableOpacity>
                // Like Button /* TO DO */
                <TouchableOpacity style={ styles.LikeButtonStyle } >
                    <Icon name="md-heart" size={ 35 } color="#FFFFFF"/>
                </TouchableOpacity>
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
    DislikeButtonStyle: {
        alignItems:'center',
        justifyContent:'center',
        width:80,
        height:80,
        backgroundColor:'#EF4836',
        borderRadius:100,
        position: 'absolute',
        bottom: 30,
        left: 80
    },
    LikeButtonStyle: {
        alignItems:'center',
        justifyContent:'center',
        width:80,
        height:80,
        backgroundColor:'#3FC380',
        borderRadius:100,
        position: 'absolute',
        bottom: 30,
        right: 80
    }
});
