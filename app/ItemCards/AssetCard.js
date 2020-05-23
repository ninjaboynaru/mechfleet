import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { H1, H3, Icon } from 'native-base';
import FaultTag from '../FaultTag';
import assetStatusData from '../subDataTypes/assetStatusData';

const styles = StyleSheet.create({
	assetCard: {
		flexDirection: 'row',
		marginVertical: 12,
		overflow: 'hidden',
		borderWidth: 1,
		borderRadius: 6,
		borderColor: 'rgba(1, 1, 1, 0.2)'
	},
	statusBlock: {
		width: '10%'
	},
	infoContainer: {
		flexGrow: 1,
		marginLeft: 12
	},
	faultTagsContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap'
	},
	tagContainer: {
		marginRight: 4,
		marginBottom: 4
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
	const statusColor = assetStatusData.getStatusData(asset.status).color;
	const statusColorStyle = { backgroundColor: statusColor };
	const faultTags = [];

	for (const faultTagValue of asset.faultTags) {
		faultTags.push(<FaultTag tagValue={faultTagValue} showText={false} key={faultTagValue} containerStyle={styles.tagContainer} />);
	}

	if (asset.faultTags.length === 0) {
		faultTags.push(<FaultTag tagValue={-1} showText={false} key={-1} containerStyle={styles.tagContainer} />);
	}


	return (
		<TouchableOpacity onPress={onPress}>
			<View style={styles.assetCard}>
				<View style={[styles.statusBlock, statusColorStyle]} />
				<View style={styles.infoContainer}>
					<H1>{asset.name}</H1>
					<Text>{asset.model}</Text>
					<View style={styles.faultTagsContainer}>
						{faultTags}
					</View>
				</View>

				<View style={styles.tasksIconContainer}>
					<Icon name="paper-plane" />
					<H3>{asset.taskCount}</H3>
				</View>
			</View>
		</TouchableOpacity>
	);
}
