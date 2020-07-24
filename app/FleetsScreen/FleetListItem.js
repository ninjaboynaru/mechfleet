import React from 'react';
import { StyleSheet, View } from 'react-native';
import { schemas } from '../realmdb';
import { Themed } from '../mechtheme';
import { mergeStyles, Text, H1 } from '../uicomponents';

const styles = StyleSheet.create({
	itemContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	mainContentContainer: {

	},
	controlsContainer: {

	}
});

function FleetListItem({ theme, fleet }) {
	const itemContainerStyle = mergeStyles(styles.itemContainerStyle, {
		padding: theme.getValue('standardPadding'),
		marginBottom: theme.getValue('expandedListItemMargin')
	});

	return (
		<View style={itemContainerStyle}>
			<View style={styles.mainContentContainer}>
				<H1>{fleet.name}</H1>
				<Text>{fleet.description}</Text>
			</View>
			<View style={styles.controlsContainer} />
		</View>
	);
}

FleetListItem.propTypes = {
	theme: Themed.themePropType.isRequired,
	fleet: schemas.fleet.propType.isRequired
};

export default Themed(FleetListItem);
