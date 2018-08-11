import React, { Component } from "react";
import StarRating from './starRatingComponent/StarRating';
import {
    View,
    ImageBackground,
    Text,
    StyleSheet,
    Button,
    Platform,
    Dimensions,
    Animated,
    PanResponder
} from "react-native";

const SCREEN_WIDTH = Dimensions.get('window').width;

class SwipeableCardView extends React.Component {
    constructor(){
        super();
        this.panResponder;
        this.state = {
            Xposition: new Animated.Value(0),
            RightText: false,
            LeftText: false,
        }
        this.CardView_Opacity = new Animated.Value(1);
    }

    componentWillMount(){
        this.panResponder = PanResponder.create({
            onStartShouldSetPanResponder: (evt, gestureState) => false,
            onMoveShouldSetPanResponder: (evt, gestureState) => true,
            onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
            onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
            onPanResponderMove: (evt, gestureState) => {
                this.state.Xposition.setValue(gestureState.dx);
                if( gestureState.dx > SCREEN_WIDTH - 250 ){
                    this.setState({
                        RightText: true,
                        LeftText: false
                    });
                }
                else if( gestureState.dx < -SCREEN_WIDTH + 250 ){
                    this.setState({
                        LeftText: true,
                        RightText: false
                    });
                }
            },
            onPanResponderRelease: (evt, gestureState) => {
                if( gestureState.dx < SCREEN_WIDTH - 250 && gestureState.dx > -SCREEN_WIDTH + 250 ){
                    this.setState({
                        LeftText: false,
                        RightText: false
                    });
                    Animated.spring( this.state.Xposition, {
                        toValue: 0,
                        speed: 5,
                        bounciness: 10,
                    }, { useNativeDriver: true }).start();
                }
                else if( gestureState.dx > SCREEN_WIDTH - 250 ){
                    Animated.parallel([
                        Animated.timing( this.state.Xposition, {
                            toValue: SCREEN_WIDTH,
                            duration: 200
                        }),
                        Animated.timing( this.CardView_Opacity, {
                            toValue: 0,
                            duration: 200
                        })
                    ], { useNativeDriver: true }).start(() => {
                        this.setState({ LeftText: false, RightText: false }, () => {
                            this.props.removeCardView();
                        });
                    });
                }
                else if( gestureState.dx < -SCREEN_WIDTH + 250 ){
                    Animated.parallel([
                        Animated.timing( this.state.Xposition, {
                            toValue: -SCREEN_WIDTH,
                            duration: 200
                        }),
                        Animated.timing( this.CardView_Opacity, {
                            toValue: 0,
                            duration: 200
                        })
                    ], { useNativeDriver: true }).start(() => {
                        this.setState({ LeftText: false, RightText: false }, () => {
                            this.props.removeCardView();
                        });
                    });
                }
            }
        });
    }

    getFormattedPriceandCategories = () => {
        let resultString = "";
        if ( this.props.item.pricing != null ) {
            resultString += this.props.item.pricing + " - ";
        }
        if ( this.props.item.categories != null ) {
            for (var i = 0; i < this.props.item.categories.length; i++) {
                if (i != 0) {
                    resultString += ", "
                }
                resultString += this.props.item.categories[i].title;
            }
        }
        return resultString;
    }

    render(){
        const rotateCard = this.state.Xposition.interpolate({
            inputRange: [-200, 0, 200],
            outputRange: ['-20deg', '0deg', '20deg'],
        });
        return(
            <Animated.View {...this.panResponder.panHandlers}
                style = {[
                    styles.cardView_Style, { backgroundColor: this.props.item.backgroundColor,
                        opacity: this.CardView_Opacity,
                        transform: [{ translateX: this.state.Xposition },
                            { rotate: rotateCard }]}
            ]}>
                <ImageBackground
                    style={ styles.cardView_Image_Style }
                    source={{ uri: this.props.item.mainImage }}>
                    <Text style = { styles.CardView_Title }> { this.props.item.cardView_Title } </Text>
                    <StarRating ratingObj={ this.props.item.ratingObj } ></StarRating>
                    <Text style = { styles.pricing_style }> { this.getFormattedPriceandCategories() } </Text>
                    {( this.state.LeftText ) ? (<Text style = { styles.Left_Text_Style }> No thanks! </Text>) : null}
                    {( this.state.RightText ) ? (<Text style = { styles.Right_Text_Style }> Like! </Text>) : null}
                </ImageBackground>
                <View style={styles.overlay} pointerEvents="none"/>
            </Animated.View>
        )
    }
}

export default SwipeableCardView;

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    cardView_Image_Style: {
        width: '100%',
        height: '100%',
        position: 'relative'
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
        fontSize: 24,
        fontWeight: 'bold'
    },
    pricing_style: {
        color: '#fff',
        fontSize: 20
    },
    Left_Text_Style: {
        bottom: 22,
        right: 32,
        position: 'absolute',
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    },
    Right_Text_Style:{
        bottom: 22,
        left: 32,
        position: 'absolute',
        color: 'green',
        fontSize: 20,
        fontWeight: 'bold',
        backgroundColor: 'transparent'
    }
});
