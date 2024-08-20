import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Button, CheckBox, Text, Textarea } from 'native-base';
import FaultTag from '../FaultTag';
import WithDataMeta from '../metaComponents/WithDataMeta';
import faultTagData from '../subDataTypes/faultTagData';
import assetStatusData from '../subDataTypes/assetStatusData';
import { assetModel } from '../db/models';

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
		this.state = {};

		if (this.asset) {
			this.state.asset = { ...this.asset };
		}
		else {
			this.state.asset = { name: '', noun: '', model: '', notes: '', status: 1, faultTags: [] };
			this.props.navigation.setOptions({ title: 'New Asset' });
		}
	}

	setAssetProperty(key, value) {
		const asset = this.state.asset;
		asset[key] = value;

		this.setState({ asset });
	}

	onNameChange(name) {
		this.setAssetProperty('name', name);
	}

	onNounChange(noun) {
		this.setAssetProperty('noun', noun);
	}

	onModelChange(model) {
		this.setAssetProperty('model', model);
	}

	onNotesChange(notes) {
		this.setAssetProperty('notes', notes);
	}

	onStatusChange(status) {
		this.setAssetProperty('status', status);
	}

	onFaultTagsChange(tagValue, removeTag) {
		const asset = this.state.asset;
		const newFaultTags = [...asset.faultTags];

		if (removeTag === true) {
			const indexToRemove = newFaultTags.indexOf(tagValue);
			newFaultTags.splice(indexToRemove, 1);
		}
		else {
			newFaultTags.push(tagValue);
		}

		this.setAssetProperty('faultTags', newFaultTags);
	}

	onSavePress() {
		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Saving Asset');

		assetModel.saveAsset(this.state.asset).then(
			() => {
				dataMeta.toastSuccess('Asset Saved');
				this.props.navigation.goBack();
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
				<Picker mode="dropdown" selectedValue={this.state.asset.status} onValueChange={this.onStatusChange}>
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

			const checked = this.state.asset.faultTags.includes(tagData.value);
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

		const { name, noun, model, notes } = this.state.asset;
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
