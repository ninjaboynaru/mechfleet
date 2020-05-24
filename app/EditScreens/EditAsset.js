import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Button, CheckBox, Text, Textarea } from 'native-base';
import FaultTag from '../FaultTag';
import WithDataMeta from '../metaComponents/WithDataMeta';
import faultTagData from '../subDataTypes/faultTagData';
import assetStatusData from '../subDataTypes/assetStatusData';
import db from '../db/db';

const styles = StyleSheet.create({
	controlsStyle: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textArea: {
		width: '100%'
	},
	faultTagBoxes: {
		marginTop: 24,
		flexDirection: 'row',
		flexWrap: 'wrap',
		alignItems: 'center'
	},
	faultTagItem: {
		width: '50%',
		flexDirection: 'row',
		marginBottom: 12
	},
	faultTagCheckBox: {
		marginRight: 32
	}
});

class EditAsset extends React.Component {
	constructor(props) {
		super(props);
		this.asset = this.props.route.params;
		this.dataMeta = this.props.dataMeta;
		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onModelChange = this.onModelChange.bind(this);
		this.onNotesChange = this.onNotesChange.bind(this);
		this.onStatusChange = this.onStatusChange.bind(this);
		this.onFaultTagsChange = this.onFaultTagsChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);
		this.state = { name: '', noun: '', model: '', notes: '', status: 1, faultTags: [] };

		if (this.asset) {
			const asset = this.asset;
			this.state = {
				name: asset.name,
				noun: asset.noun,
				model: asset.model,
				notes: asset.notes,
				status: asset.status,
				faultTags: asset.faultTags
			};
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

	onNotesChange(notes) {
		this.setState({ notes });
	}

	onStatusChange(statusValue) {
		this.setState({ status: statusValue });
	}

	onFaultTagsChange(tagValue, removeTag) {
		const newFaultTags = [...this.state.faultTags];

		if (removeTag === true) {
			const indexToRemove = this.state.faultTags.indexOf(tagValue);
			newFaultTags.splice(indexToRemove, 1);
		}
		else {
			newFaultTags.push(tagValue);
		}

		this.setState({ faultTags: newFaultTags });
	}

	onSavePress() {
		const state = this.state;
		const newAsset = {
			name: state.name,
			noun: state.noun,
			model: state.model,
			notes: state.notes,
			status: state.status,
			faultTags: state.faultTags
		};

		if (this.asset) {
			newAsset._id = this.asset._id;
		}

		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Saving Asset');

		db.saveAsset(newAsset).then(
			() => {
				dataMeta.toastSuccess('Asset Saved');
				this.props.navigation.navigate('Assets');
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error saving asset');
			}
		);
	}

	onCancelPress() {
		this.props.navigation.goBack();
	}

	buildStatusPicker() {
		const pickerItems = [];

		for (const statusData of assetStatusData.statusMap) {
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

	buildFaultTagCheckBoxes() {
		const checkBoxes = [];

		for (const tagData of faultTagData.tagMap) {
			if (tagData.value === -1) {
				continue;
			}

			const checked = this.state.faultTags.includes(tagData.value);
			const onPress = () => this.onFaultTagsChange(tagData.value, checked);

			checkBoxes.push(
				<TouchableOpacity style={styles.faultTagItem} key={tagData.value} onPress={onPress}>
					<CheckBox checked={checked} style={styles.faultTagCheckBox} onPress={onPress} />
					<FaultTag tagValue={tagData.value} />
				</TouchableOpacity>
			);
		}

		return (
			<View>
				<View style={styles.faultTagBoxes}>
					{checkBoxes}
				</View>
			</View>
		);
	}

	render() {
		if (this.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		const { name, noun, model, notes } = this.state;
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
						<Item stackedLabel>
							<Label>Notes</Label>
							<Textarea
								style={styles.textArea}
								rowSpan={5}
								bordered
								value={notes}
								onChangeText={this.onNotesChange}
							/>
						</Item>
						{this.buildStatusPicker()}
						{this.buildFaultTagCheckBoxes()}
						<View style={styles.controlsStyle}>
							<Button success onPress={this.onSavePress}><Text>Save</Text></Button>
							<Button light onPress={this.onCancelPress}><Text>Cancel</Text></Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(EditAsset);
