import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import { ErrorDisplay, LoadingDisplay } from './metaComponents';
import TaskCard from './TaskCard';
import db from './db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 12
	},
	infoText: {
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
		this.onEditPress = this.onEditPress.bind(this);
		this.onTaskArchivePress = this.onTaskArchivePress.bind(this);
		this.onAddTaskPress = this.onAddTaskPress.bind(this);
		this.onTaskCardPress = this.onTaskCardPress.bind(this);
		this.state = { tasks: null, loading: true, loadingError: false };
	}

	componentDidMount() {
		db.getAssetTasks(this.asset._id).then(
			(tasks) => {
				this.setState({ tasks, loading: false });
			},
			() => {
				this.setState({ loadingError: true });
			}
		);
	}

	onDeletePress() {

	}

	onEditPress() {

	}

	onTaskArchivePress() {

	}

	onAddTaskPress() {

	}

	onTaskCardPress(task) {
		const navigation = this.props.navigation;
		navigation.navigate('Task Info', task);
	}

	buildInfoSection() {
		const asset = this.asset;

		return (
			<View style={styles.infoSection}>
				<View style={styles.intoText}>
					<H1>{asset.name}</H1>
					<Text>{asset.model}</Text>
					<Text>Status: {asset.status}</Text>
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

	render() {
		const { loading, loadingError } = this.state;

		if (loadingError === true) {
			return <ErrorDisplay>Error Loading Assets</ErrorDisplay>;
		}
		if (loading === true) {
			return <LoadingDisplay>Loading Tasks</LoadingDisplay>;
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
