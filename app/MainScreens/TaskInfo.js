import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import PartsBrowser from '../PartsBrowser';
import PartCard from '../ItemCards/PartCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import taskTypeData from '../subDataTypes/taskTypeData';
import { taskModel, partModel } from '../db/models';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 32
	},
	infoText: {
		flexShrink: 1
	},
	infoControls: {
	},
	infoControls__item: {
		marginVertical: 5
	},
	partsList: {
	},
	descriptionContainer: {
		flex: 1,
		maxHeight: 150,
		marginBottom: 32,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: 'rgba(0,0,0,0.4)'
	},
	descriptionText: {
		padding: 6
	}
});

class TaskInfo extends React.Component {
	constructor(props) {
		super(props);
		this.taskId = this.props.route.params;
		this.onFocus = this.onFocus.bind(this);
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onCompletePress = this.onCompletePress.bind(this);
		this.togglePartsBrowser = this.togglePartsBrowser.bind(this);
		this.onDeletePartPress = this.onDeletePartPress.bind(this);
		this.addPart = this.addPart.bind(this);
		this.state = { task: null, parts: [], showPartsBrowser: false };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.loadData();
	}

	loadData() {
		this.loadTask().then((task) => {
			if (!task) {
				return;
			}

			this.loadParts(task);
		});
	}

	loadTask() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Task');

		return taskModel.getTask(this.taskId, true).then(
			(task) => {
				dataMeta.hideLoading();
				if (!task) {
					dataMeta.toastDanger('Task not found');
					return;
				}

				this.setState({ task });
				return task;
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading task');
			}
		);
	}

	loadParts(task) {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Parts');

		let taskToUse;

		if (task) {
			taskToUse = task;
		}
		else {
			taskToUse = this.state.task;
		}

		partModel.getPartsById(taskToUse.associatedParts).then(
			(parts) => {
				dataMeta.hideLoading();
				this.setState({ parts });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading parts');
			}
		);
	}

	onDeletePress() {
		this.props.dataMeta.buttonOverlay(
			'Are you sure you want to delete this task',
			'Delete',
			'danger',
			this.onDeleteConfirm
		);
	}

	onDeleteConfirm() {
		const dataMeta = this.props.dataMeta;
		dataMeta.closeButtonOverlay();
		dataMeta.showLoading('Deleating');

		taskModel.deleteTask(this.state.task._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Task Deleated');
				this.props.navigation.goBack();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error deleating task');
			}
		);
	}

	onEditPress() {
		this.props.navigation.navigate('Edit Task', { task: this.state.task });
	}

	onCompletePress() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Changing Task Status');

		taskModel.toggleTaskComplete(this.state.task._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Task status changed');
				this.loadTask();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error changing task status');
			}
		);
	}

	onDeletePartPress(partId) {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Deleating Part');

		taskModel.removePartFromTask(this.state.task._id, partId).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Deleated');
				this.loadData();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error deleating parts');
			}
		);
	}

	togglePartsBrowser() {
		this.setState({ showPartsBrowser: !this.state.showPartsBrowser });
	}

	addPart(part) {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Adding Part');

		taskModel.addPartToTask(this.state.task._id, part._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Added');
				this.setState({ showPartsBrowser: false });
				this.loadData();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error adding part');
			}
		);
	}

	buildInfoSection() {
		const task = this.state.task;
		const date = new Date(task.createdOn);
		const dateString = date.toDateString();

		let completeButtonText = 'COMPLETE';

		if (task.complete === true) {
			completeButtonText = 'UN-COMPLETE';
		}

		const typeText = taskTypeData.getTypeData(task.type).displayName;

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoText}>
					<H1>{task.name}</H1>
					<Text>Type: {typeText}</Text>
					<Text>Crated On: {dateString}</Text>
					<Text>{task.parentName}</Text>
				</View>
				<View style={styles.infoControls}>
					<Button small block style={styles.infoControls__item} onPress={this.onEditPress}>
						<Text>EDIT</Text>
					</Button>
					<Button small block style={styles.infoControls__item} onPress={this.onCompletePress}>
						<Text>{completeButtonText}</Text>
					</Button>
					<Button small block danger style={styles.infoControls__item} onPress={this.onDeletePress}>
						<Text>DELETE</Text>
					</Button>
				</View>
			</View>
		);
	}

	buildTaskDescription() {
		if (!this.state.task.description) {
			return null;
		}

		return (
			<ScrollView style={styles.descriptionContainer}>
				<Text style={styles.descriptionText}>{this.state.task.description}</Text>
			</ScrollView>
		);
	}

	buildAddPartButton() {
		let addPartText;
		let addPartButtonType;

		if (this.state.showPartsBrowser === true) {
			addPartText = 'Cancel';
			addPartButtonType = { light: true };
		}
		else {
			addPartText = 'Add Part';
			addPartButtonType = { primary: true };
		}

		return (
			<Button padder small block {...addPartButtonType} onPress={this.togglePartsBrowser}>
				<Text>{addPartText}</Text>
			</Button>
		);
	}

	buildPartList() {
		const parts = this.state.parts;
		const partCards = [];

		for (const part of parts) {
			const onDeletePress = () => { this.onDeletePartPress(part._id) };
			const partCard = <PartCard part={part} onDeletePress={onDeletePress} key={part._id} />;
			partCards.push(partCard);
		}

		return (
			<View style={styles.partsList}>
				{partCards}
			</View>
		);
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true || !this.state.task) {
			return null;
		}

		let bottomComponent;

		if (this.state.showPartsBrowser === true) {
			bottomComponent = <PartsBrowser onPartPress={this.addPart} ignorePartIds={this.state.task.associatedParts} />;
		}
		else {
			bottomComponent = this.buildPartList();
		}

		return (
			<Container>
				<Content padder>
					{this.buildInfoSection()}
					{this.buildTaskDescription()}
					{this.buildAddPartButton()}
					{bottomComponent}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(TaskInfo);
