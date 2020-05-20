import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import TaskCard from '../ItemCards/TaskCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
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

class AssetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.asset = this.props.route.params;
		this.dataMeta = this.props.dataMeta;
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onTaskArchivePress = this.onTaskArchivePress.bind(this);
		this.onAddTaskPress = this.onAddTaskPress.bind(this);
		this.onTaskCardPress = this.onTaskCardPress.bind(this);
		this.state = { tasks: [] };
	}

	componentDidMount() {
		const dataMeta = this.dataMeta;
		dataMeta.showLoading('Loading Tasks');

		db.getAssetTasks(this.asset._id).then(
			(tasks) => {
				dataMeta.hideLoading();
				this.setState({ tasks });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading tasks');
			}
		);
	}

	onDeletePress() {
		this.dataMeta.buttonOverlay(
			'Are you sure you want to delete this asset',
			'Delete',
			'danger',
			this.onDeleteConfirm
		);
	}

	onDeleteConfirm() {
		const dataMeta = this.dataMeta;
		dataMeta.closeButtonOverlay();
		dataMeta.showLoading('Deleating Asset');

		db.deleteAsset(this.asset._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Asset Deleated');
				this.props.navigation.navigate('Assets');
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error deleating asset');
			}
		);
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
		const statusText = assetStatusData.getStatusData(asset.status).displayName;

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoText}>
					<H1>{asset.name}</H1>
					<Text>{asset.noun}</Text>
					<Text>{asset.model}</Text>
					<Text>Status: {statusText}</Text>
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
			const onPress = () => this.onTaskCardPress(task);
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

	render() {
		if (this.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		return (
			<Container>
				<Content padder>
					{this.buildInfoSection()}
					{this.buildTaskList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(AssetInfo);
