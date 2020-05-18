import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, H3, Button, Text } from 'native-base';
import { ErrorDisplay, LoadingDisplay } from './metaComponents';
import TaskCard from './TaskCard';
import db from './db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12
	},
	infoSection__textSection: {
		flexDirection: 'column',
		justifyContent: 'space-around',
		alignSelf: 'stretch'
	},
	infoSection__controls: {
		justifyContent: 'space-between',
		alignItems: 'center'
	},
	controls__item: {
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

	}

	buildInfoSection() {
		const asset = this.asset;

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoSection__textSection}>
					<H1>{asset.name}</H1>
					<H3>{asset.model}</H3>
					<H3>Status: {asset.status}</H3>
				</View>
				<View style={styles.infoSection__controls}>
					<Button rounded block danger style={styles.controls__item} onPress={this.onDeletePress}>
						<Text>DELETE</Text>
					</Button>
					<Button primary rounded block style={styles.controls__item} onPress={this.onEditPress}>
						<Text>EDIT</Text>
					</Button>
					<Button light rounded block style={styles.controls__item} onPress={this.onTaskArchivePress}>
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
