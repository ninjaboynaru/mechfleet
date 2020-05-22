import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import TaskCard from '../ItemCards/TaskCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import assetStatusData from '../assetStatusData';
import db from '../db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 32
	},
	infoText: {
		flex: 1
	},
	infoTextItem: {
		marginVertical: 6
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
		this.onFocus = this.onFocus.bind(this);
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onTaskArchivePress = this.onTaskArchivePress.bind(this);
		this.onAddTaskPress = this.onAddTaskPress.bind(this);
		this.onTaskCardPress = this.onTaskCardPress.bind(this);
		this.state = { tasks: [], showCompletedTasks: false };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.loadTasks();
	}

	loadTasks() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Tasks');

		db.getAssetTasks(this.asset._id, this.state.showCompletedTasks).then(
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
		this.props.dataMeta.buttonOverlay(
			'Are you sure you want to delete this asset',
			'Delete',
			'danger',
			this.onDeleteConfirm
		);
	}

	onDeleteConfirm() {
		const dataMeta = this.props.dataMeta;
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
		this.setState({ showCompletedTasks: !this.state.showCompletedTasks }, () => this.loadTasks());
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
		let archiveText;

		if (this.state.showCompletedTasks === true) {
			archiveText = 'ACTIVE TASKS';
		}
		else {
			archiveText = 'TASK ARCHIVE';
		}

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoText}>
					<H1>{asset.name}</H1>
					<Text style={styles.infoTextItem}>{asset.noun}</Text>
					<Text style={styles.infoTextItem}>Model: {asset.model}</Text>
					<Text style={styles.infoTextItem}>Status: {statusText}</Text>
				</View>
				<View style={styles.infoControls}>
					<Button small block style={styles.infoControls__item} onPress={this.onEditPress}>
						<Text>EDIT</Text>
					</Button>
					<Button small block light style={styles.infoControls__item} onPress={this.onTaskArchivePress}>
						<Text>{archiveText}</Text>
					</Button>
					<Button small block danger style={styles.infoControls__item} onPress={this.onDeletePress}>
						<Text>DELETE</Text>
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

		let aboveListComponent = null;

		if (this.state.showCompletedTasks === false) {
			aboveListComponent = (
				<Button small block onPress={this.onAddTaskPress}>
					<Text>Add Task</Text>
				</Button>
			);
		}
		else {
			aboveListComponent = <H3 style={{ textAlign: 'center' }}>Showing Completed Tasks</H3>;
		}

		return (
			<View style={styles.taskList}>
				{aboveListComponent}
				{taskCards}
			</View>
		);
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
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

AssetInfo.propTypes = {
	route: PropTypes.object.isRequired,
	navigation: PropTypes.object.isRequired,
	dataMeta: PropTypes.object.isRequired
};

export default WithDataMeta(AssetInfo);
