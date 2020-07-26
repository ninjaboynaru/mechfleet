import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text, Icon } from 'native-base';
import faultTagData from './subDataTypes/faultTagData';

const fontSize = 16;

const styles = StyleSheet.create({
	containerStyle: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		padding: 4
	},
	iconStyle: {
		fontSize,
		color: 'white'
	},
	textStyle: {
		fontSize,
		color: 'white'
	}
});

/**
* To display fault information about an asset given a fault tag id/value
*/
export default function FaultTag({ tagValue, showText = true, containerStyle = {}, iconStyle = {}, textStyle = {} }) {
	const tagData = faultTagData.getTagData(tagValue);
	let textComponent = null;

	if (showText === true) {
		textComponent = <Text style={[styles.textStyle, textStyle]}> {tagData.displayName}</Text>;
	}


	return (
		<View style={[styles.containerStyle, containerStyle, { backgroundColor: tagData.color }]}>
			<Icon style={[styles.iconStyle, iconStyle]} type={tagData.icon.type} name={tagData.icon.name} />
			{textComponent}
		</View>
	);
}
