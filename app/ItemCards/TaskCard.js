import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { H3, Text } from 'native-base';
import taskTypeData from '../subDataTypes/taskTypeData';

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
		flexShrink: 1,
		marginLeft: 6,
		marginVertical: 6
	},
	typeBlock: {
		width: '40%',
		justifyContent: 'center',
		alignItems: 'center',
		padding: 12
	},
	typeText: {
		color: 'white',
		fontWeight: 'bold'
	}
});

export default function TaskCard({ task, onPress }) {
	const date = new Date(task.createdOn);
	const dateString = date.toDateString();
	const typeData = taskTypeData.getTypeData(task.type);
	const typeName = typeData.displayName;
	const typeBlockColorStyle = { backgroundColor: typeData.color };
	const parentName = task.parentName ? <Text>{task.parentName}</Text> : null;

	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.taskCard}>
				<View style={styles.infoBlock}>
					<H3>{task.name}</H3>
					<Text>{dateString}</Text>
					{parentName}
				</View>
				<View style={[styles.typeBlock, typeBlockColorStyle]}>
					<Text style={styles.typeText}>{typeName}</Text>
				</View>
			</View>
		</TouchableOpacity>
	);
}
