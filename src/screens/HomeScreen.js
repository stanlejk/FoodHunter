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
import { SearchBar } from 'react-native-elements';
import Icon from "react-native-vector-icons/Ionicons";
import SwipeableCardView from '../components/SwipeableCardView';
import axios from 'axios';

const API_KEY = '';

class HomeScreen extends React.Component {

    // Uses geolocation API to get user's latitude and longitude, and query's Yelp API to generate stack of cards
    getYelpResults = (userInput) => {
        if (userInput === "")
            userInput = "Food";
        // Call getCurrentPosition
        navigator.geolocation.getCurrentPosition(
            (position) => {
                // Set lat and long in state
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    error: null,
                });
                this.setState({ searchTerm: userInput });
                // Config variable to call yelp API based on location
                var config = {
                    headers: {'Authorization': 'Bearer ' + API_KEY},
                    params: {
                        term: this.state.searchTerm,
                        latitude: this.state.latitude,
                        longitude: this.state.longitude
                    }
                };
                // Use axios to retrieve response from API
                axios.get('https://api.yelp.com/v3/businesses/search', config)
                .then( response => {
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
                    alert(error.message);
                });
                // After results are generated, render the home screen
            },
            (error) => this.setState({ error: error.message }),
            { enableHighAccuracy: true, timeout: 20000 },
        );
    }

    static navigationOptions = {
        header: null
    }

    constructor(){
        super();
        // Initial state placeholder to initialize state
        this.state = {
            term: "Food",
            latitude: 34.052235,
            longitude: -118.243683,
            Sample_CardView_Items_Array: [{
                id: '1',
                cardView_Title: "Loading",
                ratingObj: {
                    rating: 0,
                    numOfRatings: 0
                }
            }],
            No_More_CardView: false,
            error: null
        };
        // Grab user's location and set in state
        this.getYelpResults("Food");
        // Then generate results from Yelp API call
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

    // NOT SURE IF USED
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
        return(
            // Container
            <View style = { styles.MainContainer }>
                <StatusBar barStyle="dark-content" />
                // SearchBar to look up specific restaurants
                <SearchBar
                    placeholder='Tacos...'
                    containerStyle={ styles.SearchBarStyle }
                    inputStyle={ styles.TextInputStyle }
                    placeholderTextColor='#a1a1a5'
                    onSubmitEditing={ (event) => this.getYelpResults( event.nativeEvent.text ) }
                    value={ this.state.searchTerm }
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
        backgroundColor: '#fafafa',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: ( Platform.OS === 'ios' ) ? 20 : 0
    },
    SearchBarStyle: {
        position: 'absolute',
        width: '100%',
        backgroundColor: '#fafafa',
        borderBottomColor: 'transparent',
        borderTopColor: 'transparent',
        top: 25,
        left: 0
    },
    TextInputStyle: {
        backgroundColor: '#e2e3e5',
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
