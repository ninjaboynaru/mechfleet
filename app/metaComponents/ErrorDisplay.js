import React from 'react';
import { View } from 'react-native';
import { H1 } from 'native-base';

const containerStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
};

const errorTextStyle = {
	color: 'red'
};

export default function ErrorDisplay(props) {
	return (
		<View style={containerStyle}>
			<H1 style={errorTextStyle}>{props.children}</H1>
		</View>
	);
}
