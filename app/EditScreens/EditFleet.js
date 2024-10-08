import React from 'react';
import PropTypes from 'prop-types';
import { db } from 'mechdb';
import { Container, Button, FormItem, Label, FieldErrorMessage, TextInput, TextArea } from 'mechui';

export default class EditFleet extends React.Component {
	constructor(props) {
		super(props);

		this.goBack = this.goBack.bind(this);
		this.save = this.save.bind(this);
		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);

		this.state = {};
		this.state.fieldErrors = { name: null };
		this.sourceFleetId = this.props.route.params;

		if (this.sourceFleetId) {
			const sourceFleet = db.models.Fleet.getById(this.sourceFleetId);
			this.state.fleet = { name: sourceFleet.name, description: sourceFleet.description };
		}
		else {
			this.state.fleet = { name: '', description: '' };
			this.props.navigation.setOptions({ title: 'New Fleet' });
		}

		this.setHeaderOptions();
	}

	setHeaderOptions() {
		const buttonLeft = <Button primary onPress={this.goBack} text="Cancel" />;
		const buttonRight = <Button primary onPress={this.save} text="Done" />;
		this.props.navigation.setOptions({
			headerLeft: () => buttonLeft,
			headerRight: () => buttonRight
		});
	}

	setFleetProperty(key, value) {
		const fleet = this.state.fleet;
		fleet[key] = value;

		this.setState({ fleet });
	}

	setFieldError(key, value) {
		const fieldErrors = this.state.fieldErrors;
		fieldErrors[key] = value;

		this.setState({ fieldErrors });
	}

	goBack() {
		this.props.navigation.goBack();
	}

	save() {
		if (this.state.fleet.name.length < 2) {
			this.setFieldError('name', 'Name must be longer');
			return;
		}

		if (this.sourceFleetId) {
			db.models.Fleet.update(this.sourceFleetId, this.state.fleet);
		}
		else {
			db.models.Fleet.create(this.state.fleet);
		}

		this.props.navigation.goBack();
	}

	onNameChange(name) {
		if (name.length >= 2 && this.state.fieldErrors.name) {
			this.setFieldError('name', null);
		}
		this.setFleetProperty('name', name);
	}

	onDescriptionChange(description) {
		this.setFleetProperty('description', description);
	}

	render() {
		const nameError = this.state.fieldErrors.name;

		return (
			<Container>
				<FormItem error={!!nameError}>
					<Label>Name</Label>
					<TextInput placeholder="Name" value={this.state.fleet.name} onChange={this.onNameChange} />
					<FieldErrorMessage show={!!nameError}>{nameError}</FieldErrorMessage>
				</FormItem>
				<FormItem>
					<Label>Description</Label>
					<TextArea
						placeholder="Description"
						value={this.state.fleet.description}
						onChange={this.onDescriptionChange}
					/>
				</FormItem>
			</Container>
		);
	}
}

EditFleet.propTypes = {
	route: PropTypes.shape({
		params: PropTypes.string
	}).isRequired,
	navigation: PropTypes.shape({
		goBack: PropTypes.func.isRequired,
		setOptions: PropTypes.func.isRequired
	}).isRequired
};
