import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { H1, H3, Icon } from 'native-base';

const styles = StyleSheet.create({
	assetCard: {
		flexDirection: 'row',
		margin: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'rgba(1, 1, 1, 0.2)'
	},
	statusBlock: {
		width: '10%',
		backgroundColor: 'green'

	},
	infoContainer: {
		flexGrow: 1,
		marginLeft: 12
	},
	tasksIconContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		flexBasis: '10%',
		marginRight: 12
	}
});

export default function AssetCard({ asset, onPress }) {
	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.assetCard}>
				<View style={styles.statusBlock} />
				<View style={styles.infoContainer}>
					<H1>{asset.name}</H1>
					<Text>{asset.model}</Text>
				</View>

				<View style={styles.tasksIconContainer}>
					<Icon name="paper-plane" />
					<H3>{asset.taskCount}</H3>
				</View>
			</View>
		</TouchableOpacity>
	);
}
