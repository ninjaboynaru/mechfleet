import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Picker, Label, Button, Text, Textarea, Toast } from 'native-base';
import { LoadingDisplay } from '../metaComponents';
import taskTypeData from '../taskTypeData';
import db from '../db/db';

const controlsStyle = {
	marginTop: 16,
	flexDirection: 'row',
	justifyContent: 'space-between'
};

const textAreaStyle = {
	width: '100%'
};

export default class EditTask extends React.Component {
	constructor(props) {
		super(props);
		this.parentAssetId = this.props.route.params.parentAssetId;
		this.task = this.props.route.params.task;
		this.onNameChange = this.onNameChange.bind(this);
		this.onDescriptionChange = this.onDescriptionChange.bind(this);
		this.onTypeChange = this.onTypeChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);

		if (this.task) {
			const task = this.task;
			this.state = { name: task.name, description: task.description, type: task.type };
		}
		else {
			this.state = { name: '', description: '', type: 1 };
			this.props.navigation.setOptions({ title: 'New Task' });
		}

		this.state.loading = false;
	}

	onNameChange(name) {
		this.setState({ name });
	}

	onDescriptionChange(description) {
		this.setState({ description });
	}

	onTypeChange(type) {
		this.setState({ type });
	}

	onSavePress() {
		const state = this.state;
		let newTask = {};
		const applyStateToNewTask = () => Object.assign(newTask, {
			name: state.name,
			description: state.description,
			type: state.type
		});

		if (this.task) {
			newTask = { ...this.task };
			applyStateToNewTask();
		}
		else {
			applyStateToNewTask();
			newTask.parentAsset = this.parentAssetId;
			newTask.compleated = false;
			newTask.associatedParts = [];
			newTask.createdOn = new Date().getTime();
		}

		this.setState({ loading: true });
		db.saveTask(newTask).then(
			() => {
				Toast.show({
					text: 'Task Saved',
					type: 'success',
					duration: 4000
				});

				this.props.navigation.navigate('Assets');
			},
			(err) => {
				console.log('TASK SAVE ERROR: ', err);
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

	buildTypePicker() {
		const pickerItems = [];

		for (const typeData of taskTypeData.typeMap) {
			const pickerItem = <Picker.Item label={typeData.displayName} value={typeData.value} key={typeData.value} />;
			pickerItems.push(pickerItem);
		}

		return (
			<Item picker>
				<Picker mode="dropdown" selectedValue={this.state.type} onValueChange={this.onTypeChange}>
					{pickerItems}
				</Picker>
			</Item>
		);
	}

	render() {
		if (this.state.loading === true) {
			return <LoadingDisplay>Saving</LoadingDisplay>;
		}

		const { name, description } = this.state;
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
								style={textAreaStyle}
								rowSpan={5}
								bordered
								value={description}
								onChangeText={this.onDescriptionChange}
							/>
						</Item>
						{this.buildTypePicker()}
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
