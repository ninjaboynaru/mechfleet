/* eslint-disable react/jsx-props-no-spreading */

import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, H2 } from 'native-base';

const styles = StyleSheet.create({
	overlay: {
		zIndex: 10,
		position: 'absolute',
		width: '100%',
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.8)'
	},
	overlayContent: {
		justifyContent: 'center',
		alignItems: 'center',
		padding: 32,
		borderRadius: 12,
		backgroundColor: 'white'
	},
	overlayButton: {
		marginVertical: 12
	}
});

/**
* buttonType should be string matching a native-base button style such as 'success' or 'danger'
*/
export default function ButtonOverlay({ titleText, buttonText, buttonType, onButtonPress, onClosePress }) {
	const buttonTypeProp = { [buttonType]: true };
	return (
		<View style={styles.overlay}>
			<View style={styles.overlayContent}>
				<H2>{titleText}</H2>
				<Button block style={styles.overlayButton} onPress={onButtonPress} {...buttonTypeProp}>
					<Text>{buttonText}</Text>
				</Button>
				<Button block light style={styles.overlayButton} onPress={onClosePress}>
					<Text>Cancel</Text>
				</Button>
			</View>
		</View>
	);
}
