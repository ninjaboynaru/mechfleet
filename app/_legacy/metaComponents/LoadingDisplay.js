import React from 'react';
import { View } from 'react-native';
import { Spinner, H1 } from 'native-base';

const containerStyle = {
	flex: 1,
	justifyContent: 'center',
	alignItems: 'center'
};

export default function LoadingDisplay(props) {
	return (
		<View style={containerStyle}>
			<Spinner />
			<H1>{props.children}</H1>
		</View>
	);
}
