import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import PartCard from '../ItemCards/PartCard';
import WithDataMeta from '../metaComponents/WithDataMeta';
import taskTypeData from '../taskTypeData';
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
		this.onAddPartPress = this.onAddPartPress.bind(this);
		this.onDeletePartPress = this.onDeletePartPress.bind(this);
		this.state = { parts: [] };
	}

	componentDidMount() {
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

	}

	onAddPartPress() {

	}

	onDeletePartPress() {

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

	buildPartList() {
		const parts = this.state.parts;
		const partCards = [];

		for (const part of parts) {
			const onDeletePress = () => { this.onDeletePartPress(part) };
			const partCard = <PartCard part={part} onDeletePress={onDeletePress} key={part._id} />;
			partCards.push(partCard);
		}

		return (
			<View style={styles.partsList}>
				<Button small block onPress={this.onAddPartPress}>
					<Text>Add Part</Text>
				</Button>
				{partCards}
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
					{this.buildPartList()}
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(TaskInfo);
