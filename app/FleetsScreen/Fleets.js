import React from 'react';
import { Text } from 'react-native';
import { Themed } from '../mechtheme';
import { Container, Logo, Button } from '../uicomponents';
import FleetList from './FleetList';
import { db } from '../realmdb';

class Fleets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbinit: false, dbinitError: false, fleets: null };
	}

	componentDidMount() {
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
				<Button title="New Fleet" />
			</Container>
		);
	}
}

export default Themed(Fleets);
