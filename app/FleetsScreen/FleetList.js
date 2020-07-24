import React from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { schemas } from '../realmdb';
import FleetListItem from './FleetListItem';

export default function FleetList({ fleets }) {
	const renderItem = ({ item }) => <FleetListItem fleet={item} />;
	return (
		<View>
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
