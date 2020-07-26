import React from 'react';
import PropTypes from 'prop-types';
import { Themed } from 'mechtheme';
import { Container, Logo, Button, Text } from 'mechui';
import { db } from 'mechdb';
import FleetList from './FleetList';

class Fleets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbinit: false, dbinitError: false, fleets: null };
		this.onFocus = this.onFocus.bind(this);
		this.onNewFleetPress = this.onNewFleetPress.bind(this);

		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		if (db.isInitialized() === false) {
			db.init().then(() => {
				this.setState({ dbinit: true, fleets: db.models.fleet.getAll() });
			})
			.catch((error) => {
				console.error(error);
				this.setState({ dbinitError: true });
			});
		}
		else {
			this.setState({ dbinit: true, fleets: db.models.fleet.getAll() });
		}
	}

	onNewFleetPress() {
		this.props.navigation.navigate('Edit Fleet');
	}

	buildFleetList() {
		return <FleetList fleets={this.state.fleets} />;
	}

	buildLoadingUi() {
		return <Text>Loading</Text>;
	}

	buildErrorMessage() {
		return <Text>Error Message</Text>;
	}

	render() {
		const { dbinit, dbinitError } = this.state;
		let toRender = null;

		if (dbinitError === true) {
			toRender = this.buildErrorMessage();
		}
		else if (dbinit === false) {
			toRender = this.buildLoadingUi();
		}
		else {
			toRender = this.buildFleetList();
		}

		return (
			<Container center>
				<Logo />
				{toRender}
				<Button onPress={this.onNewFleetPress} text="New Fleet" style={{ minWidth: 150 }} />
			</Container>
		);
	}
}

Fleets.propType = {
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		addListener: PropTypes.func.isRequired
	}).isRequired
};

export default Themed(Fleets);
