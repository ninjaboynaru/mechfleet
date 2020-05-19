import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Button, Text, Toast } from 'native-base';
import { LoadingDisplay } from '../metaComponents';
import assetStatusMap from '../assetStatusMap';
import db from '../db/db';

const controlsStyle = {
	marginTop: 16,
	flexDirection: 'row',
	justifyContent: 'space-between'
};

export default class EditAsset extends React.Component {
	constructor(props) {
		super(props);
		this.asset = this.props.route.params;
		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onModelChange = this.onModelChange.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);
		this.state = { name: '', noun: '', model: '', status: 1, loading: false };

		if (this.asset) {
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

	onSavePress() {
		const state = this.state;
		const newAsset = {
			name: state.name,
			noun: state.noun,
			model: state.model,
			status: state.status
		};

		if (this.asset) {
			newAsset._id = this.asset._id;
		}

		this.setState({ loading: true });
		db.saveAsset(newAsset).then(
			() => {
				Toast.show({
					text: 'Asset Saved',
					type: 'success',
					duration: 4000
				});

				this.props.navigation.navigate('Assets');
			},
			() => {
				Toast.show({
					text: 'Save Error',
					type: 'danger',
					duration: 4000
				});

				this.setState({ loading: false });
			}
		);
	}

	onCancelPress() {
		this.props.navigation.goBack();
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
		if (this.state.loading === true) {
			return <LoadingDisplay>Saving</LoadingDisplay>;
		}

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
						<View style={controlsStyle}>
							<Button success onPress={this.onSavePress}><Text>Save</Text></Button>
							<Button light onPress={this.onCancelPress}><Text>Cancel</Text></Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}
