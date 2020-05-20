import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { H1, H3 } from 'native-base';

const styles = StyleSheet.create({
	taskCard: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginVertical: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'rgba(1, 1, 1, 0.2)'
	},
	infoBlock: {
		marginLeft: 6,
		marginVertical: 6
	},
	typeBlock: {
		flexBasis: '20%',
		backgroundColor: 'green',
		color: 'white',
		justifyContent: 'center',
		alignItems: 'center'
	},
	typeText: {
		color: 'white'
	}
});

export default function TaskCard({ task, onPress }) {
	const date = new Date(task.createdOn);
	const dateString = date.toDateString();
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.taskCard}>
				<View style={styles.infoBlock}>
					<H1>{task.name}</H1>
					<H3>{dateString}</H3>
				</View>
				<View style={styles.typeBlock}>
					<H3 style={styles.typeText}>{task.type}</H3>
				</View>
			</View>
		</TouchableOpacity>
	);
}
