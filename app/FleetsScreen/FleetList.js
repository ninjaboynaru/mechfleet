import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';

import { schemas } from 'mechdb';
import FleetListItem from './FleetListItem';

export default function FleetList({ fleets, editFleet, deleteFleet }) {
	const renderItem = ({ item }) => <FleetListItem fleet={item} editFleet={editFleet} deleteFleet={deleteFleet} />;
	return (
		<View>
			<FlatList data={fleets} renderItem={renderItem} style={{ flexGrow: 0 }} />
		</View>
	);
}


FleetList.propTypes = {
	fleets: PropTypes.objectOf(schemas.fleet.propType),
	editFleet: PropTypes.func.isRequired,
	deleteFleet: PropTypes.func.isRequired
};

FleetList.defaultProps = {
	fleets: []
};
