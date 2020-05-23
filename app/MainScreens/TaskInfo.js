import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import PartsBrowser from '../PartsBrowser';
import PartCard from '../ItemCards/PartCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import taskTypeData from '../subDataTypes/taskTypeData';
import db from '../db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 32
	},
	infoText: {
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
		this.task = this.props.route.params;
		this.dataMeta = this.props.dataMeta;
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onCompletePress = this.onCompletePress.bind(this);
		this.togglePartsBrowser = this.togglePartsBrowser.bind(this);
		this.onDeletePartPress = this.onDeletePartPress.bind(this);
		this.addPart = this.addPart.bind(this);
		this.state = { parts: [], showPartsBrowser: false };
	}

	componentDidMount() {
		this.loadParts();
	}

	loadParts() {
		this.dataMeta.showLoading('Loading Parts');
		db.getPartsById(this.task.associatedParts).then(
			(parts) => {
				this.dataMeta.hideLoading();
				this.setState({ parts });
			},
			() => {
				this.dataMeta.hideLoading();
				this.dataMeta.toastDanger('Error loading parts');
			}
		);
	}

	onDeletePress() {
		this.dataMeta.buttonOverlay(
			'Are you sure you want to delete this task',
			'Delete',
			'danger',
			this.onDeleteConfirm
		);
	}

	onDeleteConfirm() {
		this.dataMeta.closeButtonOverlay();
		this.dataMeta.showLoading('Deleating');
		db.deleteTask(this.task._id).then(
			() => {
				this.dataMeta.hideLoading();
				this.dataMeta.toastSuccess('Task Deleated');
				this.props.navigation.navigate('Assets');
			},
			() => {
				this.dataMeta.hideLoading();
				this.dataMeta.toastDanger('Error deleating task');
			}
		);
	}

	onEditPress() {
		this.props.navigation.navigate('Edit Task', { task: this.task });
	}

	onCompletePress() {
		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Changing Task Status');

		db.toggleTaskComplete(this.task).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Task status changed');
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error changing task status');
			}
		);
	}

	onDeletePartPress(partId) {
		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Deleating Part');
		db.removePartFromTask(this.task, partId).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Deleated');
				this.loadParts();
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
		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Adding Part');

		db.addPartToTask(this.task, part._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Added');
				this.setState({ showPartsBrowser: false });
				this.loadParts();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error adding part');
			}
		);
	}

	buildInfoSection() {
		const task = this.task;
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
		if (!this.task.description) {
			return null;
		}

		return (
			<ScrollView style={styles.descriptionContainer}>
				<Text style={styles.descriptionText}>{this.task.description}</Text>
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
		if (this.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		let bottomComponent;

		if (this.state.showPartsBrowser === true) {
			bottomComponent = <PartsBrowser onPartPress={this.addPart} ignorePartIds={this.task.associatedParts} />;
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
