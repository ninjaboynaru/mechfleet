import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Button, Text, Textarea } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import taskTypeData from '../subDataTypes/taskTypeData';
import { taskModel } from '../db/models';

const styles = StyleSheet.create({
	controls: {
		marginTop: 16,
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	textArea: {
		width: '100%'
	}
});

class EditTask extends React.Component {
	constructor(props) {
		super(props);
		this.parentAssetId = this.props.route.params.parentAssetId;
		this.task = this.props.route.params.task;
		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);
		this.state = {};

		if (this.task) {
			this.state.task = { ...this.task };
		}
		else {
			this.state.task = { name: '', description: '', type: 1 };
			this.props.navigation.setOptions({ title: 'New Task' });
		}
	}

	setTaskProperty(key, value) {
		const task = this.state.task;
		task[key] = value;

		this.setState({ task });
	}

	onNameChange(name) {
		this.setTaskProperty('name', name);
	}

	onDescriptionChange(description) {
		this.setTaskProperty('description', description);
	}

	onTypeChange(type) {
		this.setTaskProperty('type', type);
	}

	onSavePress() {
		const task = { ...this.state.task };

		if (!this.task) {
			task.parentAsset = this.parentAssetId;
			task.createdOn = new Date().getTime();
			task.complete = false;
			task.associatedParts = [];
		}

		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Saving Task');

		taskModel.saveTask(task).then(
			() => {
				dataMeta.toastSuccess('Task Saved');
				this.props.navigation.goBack();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error saving task');
			}
		);
	}

	onCancelPress() {
		this.props.navigation.goBack();
	}

	buildTypePicker() {
		const pickerItems = [];

		for (const typeData of taskTypeData.typeMap) {
			const pickerItem = <Picker.Item label={typeData.displayName} value={typeData.value} key={typeData.value} />;
			pickerItems.push(pickerItem);
		}

		return (
			<Item picker>
				<Picker mode="dropdown" selectedValue={this.state.task.type} onValueChange={this.onTypeChange}>
					{pickerItems}
				</Picker>
			</Item>
		);
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		const { name, description } = this.state.task;
		return (
			<Container>
				<Content padder>
					<Form>
						<Item stackedLabel>
							<Label>Name</Label>
							<Input value={name} onChangeText={this.onNameChange} />
						</Item>
						<Item stackedLabel>
							<Label>Description</Label>
							<Textarea
								style={styles.textArea}
								rowSpan={5}
								bordered
								value={description}
								onChangeText={this.onDescriptionChange}
							/>
						</Item>
						{this.buildTypePicker()}
						<View style={styles.controls}>
							<Button success onPress={this.onSavePress}><Text>Save</Text></Button>
							<Button light onPress={this.onCancelPress}><Text>Cancel</Text></Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(EditTask);
