import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text, Toast } from 'native-base';
import { ErrorDisplay, LoadingDisplay, ButtonOverlay } from '../metaComponents';
import TaskCard from '../ItemCards/TaskCard';
import assetStatusData from '../assetStatusData';
import db from '../db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	infoText: {
		flex: 1
	},
	infoControls: {
	},
	infoControls__item: {
		marginVertical: 5
	},
	taskList: {

	}
});

export default class AssetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.asset = this.props.route.params;
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onTaskArchivePress = this.onTaskArchivePress.bind(this);
		this.onAddTaskPress = this.onAddTaskPress.bind(this);
		this.onTaskCardPress = this.onTaskCardPress.bind(this);
		this.state = { tasks: null, loadingTasks: true, loadingDelete: false, loadingError: false, showDeleteConfirmation: false };
	}

	componentDidMount() {
		db.getAssetTasks(this.asset._id).then(
			(tasks) => {
				this.setState({ tasks, loadingTasks: false });
			},
			() => {
				this.setState({ loadingError: true });
			}
		);
	}

	onDeletePress() {
		this.setState({ showDeleteConfirmation: true });
	}

	onDeleteConfirm() {
		this.setState({ showDeleteConfirmation: false, loadingDelete: true });
		db.deleteAsset(this.asset._id).then(
			() => {
				Toast.show({
					text: 'Asset Deleted',
					type: 'success',
					duration: 4000
				});

				this.props.navigation.navigate('Assets');
			},
			() => {
				Toast.show({
					text: 'Delete Error',
					type: 'danger',
					duration: 4000
				});

				this.setState({ loadingDelete: false });
			}
		);
	}

	onCancelDelete() {
		this.setState({ showDeleteConfirmation: false });
	}

	onEditPress() {
		this.props.navigation.navigate('Edit Asset', this.asset);
	}

	onTaskArchivePress() {

	}

	onAddTaskPress() {
		this.props.navigation.navigate('Edit Task', { parentAssetId: this.asset._id });
	}

	onTaskCardPress(task) {
		this.props.navigation.navigate('Task Info', task);
	}

	buildInfoSection() {
		const asset = this.asset;
		const assetText = assetStatusData.getStatusData(asset.status).displayName;

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoText}>
					<H1>{asset.name}</H1>
					<Text>{asset.noun}</Text>
					<Text>{asset.model}</Text>
					<Text>Status: {assetText}</Text>
				</View>
				<View style={styles.intoControls}>
					<Button rounded block danger style={styles.infoControls__item} onPress={this.onDeletePress}>
						<Text>DELETE</Text>
					</Button>
					<Button primary rounded block style={styles.infoControls__item} onPress={this.onEditPress}>
						<Text>EDIT</Text>
					</Button>
					<Button light rounded block style={styles.infoControls__item} onPress={this.onTaskArchivePress}>
						<Text>TASK ARCHIVE</Text>
					</Button>
				</View>
			</View>
		);
	}

	buildTaskList() {
		const tasks = this.state.tasks;
		const taskCards = [];

		for (const task of tasks) {
			const onPress = () => { this.onTaskCardPress(task) };
			const taskCard = <TaskCard task={task} onPress={onPress} key={task._id} />;
			taskCards.push(taskCard);
		}

		return (
			<View style={styles.taskList}>
				<Button success block onPress={this.onAddTaskPress}>
					<Text>Add Task</Text>
				</Button>
				{taskCards}
			</View>
		);
	}

	buildDeleteConfirmation() {
		return (
			<ButtonOverlay
				titleText="Are you sure you want to delete this asset. This can not be undone"
				buttonText="DELETE"
				buttonType="danger"
				onButtonPress={this.onDeleteConfirm}
				onClosePress={this.onCancelDelete}
			/>
		);
	}

	render() {
		const { loadingTasks, loadingDelete, loadingError, showDeleteConfirmation } = this.state;

		if (loadingError === true) {
			return <ErrorDisplay>Error Loading Assets</ErrorDisplay>;
		}
		if (loadingTasks === true) {
			return <LoadingDisplay>Loading Tasks</LoadingDisplay>;
		}
		if (loadingDelete === true) {
			return <LoadingDisplay>Deleting Asset</LoadingDisplay>;
		}

		let deleteConfirmation = null;
		if (showDeleteConfirmation === true) {
			deleteConfirmation = this.buildDeleteConfirmation();
		}


		return (
			<Container>
				<Content padder>
					{this.buildInfoSection()}
					{this.buildTaskList()}
				</Content>
				{deleteConfirmation}
			</Container>
		);
	}
}
