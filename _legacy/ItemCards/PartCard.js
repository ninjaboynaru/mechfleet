import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { H1, Text, Button } from 'native-base';

const styles = StyleSheet.create({
	partCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 12,
		padding: 6,
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'rgba(1, 1, 1, 0.2)'
	}
});

export default function PartCard({ part, onPress, onDeletePress }) {
	let deleteButton = null;

	if (onDeletePress) {
		deleteButton = (
			<View>
				<Button danger small block onPress={onDeletePress}>
					<Text>Delete</Text>
				</Button>
			</View>
		);
	}

	if (!onPress) {
		onPress = () => {};
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.partCard}>
				<View>
					<H1>{part.name}</H1>
					<Text>{part.noun}</Text>
					<Text>{`NSN: ${part.nsn}`}</Text>
				</View>
				{deleteButton}
			</View>
		</TouchableOpacity>
	);
}
