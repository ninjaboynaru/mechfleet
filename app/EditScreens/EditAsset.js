import React from 'react';
import { Container, Content, Form, Item, Input, Picker, Label } from 'native-base';
import assetStatusMap from '../assetStatusMap';

const EDIT_TYPE = { NEW: 1, EDIT: 2 };

export default class EditAsset extends React.Component {
	constructor(props) {
		super(props);
		this.asset = this.props.route.params;
		this.editType = this.asset ? EDIT_TYPE.EDIT : EDIT_TYPE.NEW;
		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onModelChange = this.onModelChange.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);
		this.state = { name: '', noun: '', model: '', status: 1 };

		if (this.editType === EDIT_TYPE.EDIT) {
			const asset = this.asset;
			this.state = { name: asset.name, noun: asset.noun, model: asset.model, status: asset.status };
		}
		else {
			this.props.navigation.setOptions({ title: 'New Asset' });
		}
	}

	onNameChange(name) {
		this.setState({ name });
	}

	onNounChange(noun) {
		this.setState({ noun });
	}

	onModelChange(model) {
		this.setState({ model });
	}

	onStatusChange(statusValue) {
		this.setState({ status: statusValue });
	}

	buildStatusPicker() {
		const pickerItems = [];

		for (const statusData of assetStatusMap) {
			const pickerItem = <Picker.Item label={statusData.displayName} value={statusData.value} key={statusData.value} />;
			pickerItems.push(pickerItem);
		}

		return (
			<Item picker>
				<Picker mode="dropdown" selectedValue={this.state.status} onValueChange={this.onStatusChange}>
					{pickerItems}
				</Picker>
			</Item>
		);
	}

	render() {
		const { name, noun, model } = this.state;

		return (
			<Container>
				<Content padder>
					<Form>
						<Item stackedLabel>
							<Label>Name</Label>
							<Input value={name} onChangeText={this.onNameChange} />
						</Item>
						<Item stackedLabel>
							<Label>Noun</Label>
							<Input value={noun} onChangeText={this.onNounChange} />
						</Item>
						<Item stackedLabel>
							<Label>Model</Label>
							<Input value={model} onChangeText={this.onModelChange} />
						</Item>
						{this.buildStatusPicker()}
					</Form>
				</Content>
			</Container>
		);
	}
}
