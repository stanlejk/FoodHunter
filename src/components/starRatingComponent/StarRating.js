import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Image,
	Text
} from 'react-native';

type Props = {
	ratingObj : {
		rating: number;
		numOfRatings: number;
	}
};

export default class StarRating extends Component<Props> {
	render() {
		// Recieve the ratings object from the props
		let ratingObj = this.props.ratingObj;

		let stars;

		if (ratingObj.rating != null) {
			let path = require('./zeroStars.png');
			if(ratingObj.rating > 0.0 && ratingObj.rating <= 1.0){
				path = require('./oneStars.png');
			}
			else if (ratingObj.rating <= 1.5){
				path = require('./oneHalfStars.png');
			}
			else if (ratingObj.rating <= 2.0){
				path = require('./twoStars.png');
			}
			else if (ratingObj.rating <= 2.5){
				path = require('./twoHalfStars.png');
			}
			else if (ratingObj.rating <= 3.0){
				path = require('./threeStars.png');
			}
			else if (ratingObj.rating <= 3.5){
				path = require('./threeHalfStars.png');
			}
			else if (ratingObj.rating <= 4.0){
				path = require('./fourStars.png');
			}
			else if (ratingObj.rating <= 4.5){
				path = require('./fourHalfStars.png');
			}
			else {
				path = require('./fiveStars.png');
			}
			stars = ((<Image style={styles.image} source={path} />));
		}

		return (
			<View style={ styles.container }>
				{ stars }
				<Text style={styles.text}>({ratingObj.numOfRatings})</Text>
				}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center'
	},
	image: {
		marginLeft: 5,
		width: 140,
		height: 25
	},
	text: {
		fontSize: 20,
		marginLeft: 5,
		marginRight: 10,
		color: "#FFFFFF"
	}
});
