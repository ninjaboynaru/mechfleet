import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, FlatList } from 'react-native';

import { schemas } from 'mechdb';
import FleetListItem from './FleetListItem';

const styles = StyleSheet.create({
	listContainer: {
		// width: 200
	},
	list: {

	}
});

export default function FleetList({ fleets }) {
	const renderItem = ({ item }) => <FleetListItem fleet={item} />;
	return (
		<View style={styles.listContainer}>
			<FlatList data={fleets} renderItem={renderItem} style={{ flexGrow: 0 }} />
		</View>
	);
}


FleetList.propTypes = {
	fleets: PropTypes.objectOf(schemas.fleet.propType)
};

FleetList.defaultProps = {
	fleets: []
};
