import React from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, View, ScrollView } from 'react-native';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import TaskCard from '../ItemCards/TaskCard';
import FaultTag from '../FaultTag';
import WithDataMeta from '../metaComponents/WithDataMeta';
import assetStatusData from '../subDataTypes/assetStatusData';
import { assetModel, taskModel } from '../db/models';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between'
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
	faultTags: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 24
	},
	tagContainer: {
		marginRight: 4,
		marginBottom: 4
	},
	notesContainer: {
		flex: 1,
		maxHeight: 150,
		marginBottom: 32,
		borderWidth: 1,
		borderRadius: 4,
		borderColor: 'rgba(0,0,0,0.4)'
	},
	notesText: {
		padding: 6
	},
	taskList: {
	}
});

class AssetInfo extends React.Component {
	constructor(props) {
		super(props);
		this.assetId = this.props.route.params;
		this.onFocus = this.onFocus.bind(this);
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onTaskArchivePress = this.onTaskArchivePress.bind(this);
		this.onAddTaskPress = this.onAddTaskPress.bind(this);
		this.onTaskCardPress = this.onTaskCardPress.bind(this);
		this.state = { asset: null, tasks: [], showCompletedTasks: false };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.loadData();
	}

	loadData() {
		this.loadAsset().then((asset) => {
			if (!asset) {
				return;
			}

			this.loadTasks();
		});
	}

	loadAsset() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Asset');

		return assetModel.getAsset(this.assetId).then(
			(asset) => {
				dataMeta.hideLoading();
				if (!asset) {
					dataMeta.toastDanger('Asset not found');
					return;
				}

				this.setState({ asset });
				return asset;
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading asset');
			}
		);
	}

	loadTasks() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Tasks');

		return taskModel.getAssetTasks(this.assetId, this.state.showCompletedTasks).then(
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
		dataMeta.showLoading('Deleting  Asset');

		assetModel.deleteAsset(this.state.asset._id).then(
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
		this.props.navigation.navigate('Edit Asset', this.state.asset);
	}

	onTaskArchivePress() {
		this.setState({ showCompletedTasks: !this.state.showCompletedTasks }, () => this.loadTasks());
	}

	onAddTaskPress() {
		this.props.navigation.navigate('Edit Task', { parentAssetId: this.state.asset._id });
	}

	onTaskCardPress(taskId) {
		this.props.navigation.navigate('Task Info', taskId);
	}

	buildInfoSection() {
		const asset = this.state.asset;
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

	buildFaultTags() {
		const faultTags = [];
		for (const faultTagValue of this.state.asset.faultTags) {
			faultTags.push(<FaultTag tagValue={faultTagValue} key={faultTagValue} containerStyle={styles.tagContainer} />);
		}

		if (this.state.asset.faultTags.length === 0) {
			faultTags.push(<FaultTag tagValue={-1} key={-1} containerStyle={styles.tagContainer} />);
		}

		return (
			<View style={styles.faultTags}>
				{faultTags}
			</View>
		);
	}

	buildAssetNotes() {
		if (!this.state.asset.notes) {
			return null;
		}

		return (
			<ScrollView style={styles.notesContainer}>
				<Text style={styles.notesText}>{this.state.asset.notes}</Text>
			</ScrollView>
		);
	}

	buildTaskList() {
		const tasks = this.state.tasks;
		const taskCards = [];

		for (const task of tasks) {
			const onPress = () => this.onTaskCardPress(task._id);
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
		if (this.props.dataMeta.visibleDisplays.loading === true || !this.state.asset) {
			return null;
		}

		return (
			<Container>
				<Content padder>
					{this.buildInfoSection()}
					{this.buildFaultTags()}
					{this.buildAssetNotes()}
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
