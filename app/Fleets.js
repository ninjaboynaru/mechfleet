import React from 'react';
import { Text } from 'react-native';
import { Themed } from './mechtheme';
import { Container, Logo } from './uicomponents';
import db from './realmdb';

class Fleets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbinit: false, dbinitError: false };
	}

	componentDidMount() {
		if (db.isInitialized() === false) {
			db.init().then(
				() => {
					this.setState({ dbinit: true });
				},
				() => {
					this.setState({ dbinitError: true });
				}
			);
		}
		else {
			this.setState({ dbinit: true });
		}
	}

	buildFleetList() {
		return <Text>Fleet List</Text>;
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
			<Container>
				<Logo />
				{toRender}
			</Container>
		);
	}
}

export default Themed(Fleets);
