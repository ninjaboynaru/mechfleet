import React from 'react';
import PropTypes from 'prop-types';
import { Themed } from 'mechtheme';
import { Container, Logo, Button, Text, WithConfirmationModal } from 'mechui';
import { db } from 'mechdb';
import FleetList from './FleetList';


class Fleets extends React.Component {
	constructor(props) {
		super(props);
		this.state = { dbinit: false, dbinitError: false, fleets: null };
		this.onFocus = this.onFocus.bind(this);
		this.newFleet = this.newFleet.bind(this);
		this.editFleet = this.editFleet.bind(this);
		this.deleteFleet = this.deleteFleet.bind(this);
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		if (db.isInitialized() === false) {
			db.init().then(() => {
				this.setState({ dbinit: true, fleets: db.models.Fleet.getAll() });
			})
			.catch((error) => {
				console.error(error);
				this.setState({ dbinitError: true });
			});
		}
		else {
			this.setState({ dbinit: true, fleets: db.models.Fleet.getAll() });
		}
	}

	newFleet() {
		this.props.navigation.navigate('Edit Fleet');
	}

	editFleet(fleet) {
		this.props.navigation.navigate('Edit Fleet', fleet.id);
	}

	deleteFleet(fleet) {
		const title = 'Are you sure?';
		const body = 'Are you sure you want to delete this fleet. This can not be undone';
		const cancelText = 'CANCEL';
		const confirmText = 'DELETE';
		const onConfirm = () => {
			db.models.Fleet.delete(fleet);
			this.forceUpdate();
		};

		this.props.showModal(title, body, cancelText, confirmText, null, onConfirm);
	}

	buildFleetList() {
		return <FleetList fleets={this.state.fleets} editFleet={this.editFleet} deleteFleet={this.deleteFleet} />;
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
				<Button primary onPress={this.newFleet} text="New Fleet" style={{ minWidth: 150 }} />
			</Container>
		);
	}
}

Fleets.propType = {
	showModal: PropTypes.func.isRequired,
	navigation: PropTypes.shape({
		navigate: PropTypes.func.isRequired,
		addListener: PropTypes.func.isRequired
	}).isRequired
};

export default Themed(WithConfirmationModal(Fleets));
