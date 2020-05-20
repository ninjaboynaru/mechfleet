import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text, Toast } from 'native-base';
import { ErrorDisplay, LoadingDisplay, ButtonOverlay } from '../metaComponents';
import PartCard from '../ItemCards/PartCard';
import db from '../db/db';

const styles = StyleSheet.create({
	infoSection: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'flex-start',
		marginBottom: 12
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

export default class TaskInfo extends React.Component {
	constructor(props) {
		super(props);
		this.task = this.props.route.params;
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);
		this.onCancelDelete = this.onCancelDelete.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onCompletePress = this.onCompletePress.bind(this);
		this.onAddPartPress = this.onAddPartPress.bind(this);
		this.onDeletePartPress = this.onDeletePartPress.bind(this);
		this.state = { parts: null, loadingParts: true, loadingDelete: false, loadingError: false, showDeleteConfirmation: false };
	}

	componentDidMount() {
		db.getPartsById(this.task.associatedParts).then(
			(parts) => {
				this.setState({ parts, loadingParts: false });
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
		db.deleteTask(this.task._id).then(
			() => {
				Toast.show({
					text: 'Task Deleted',
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

		return (
			<View style={styles.infoSection}>
				<View style={styles.infoText}>
					<H1>{task.name}</H1>
					<Text>{task.type}</Text>
					<Text>{dateString}</Text>
				</View>
				<View style={styles.infoControls}>
					<Button rounded block danger style={styles.infoControls__item} onPress={this.onDeletePress}>
						<Text>DELETE</Text>
					</Button>
					<Button primary rounded block style={styles.infoControls__item} onPress={this.onEditPress}>
						<Text>EDIT</Text>
					</Button>
					<Button info rounded block style={styles.infoControls__item} onPress={this.onCompletePress}>
						<Text>{completeButtonText}</Text>
					</Button>
				</View>
			</View>
		);
	}

	buildDeleteConfirmation() {
		return (
			<ButtonOverlay
				titleText="Are you sure you want to delete this task. This can not be undone"
				buttonText="DELETE"
				buttonType="danger"
				onButtonPress={this.onDeleteConfirm}
				onClosePress={this.onCancelDelete}
			/>
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
				<Button success block onPress={this.onAddPartPress}>
					<Text>Add Part</Text>
				</Button>
				{partCards}
			</View>
		);
	}

	render() {
		const { loadingParts, loadingDelete, loadingError, showDeleteConfirmation } = this.state;

		if (loadingError === true) {
			return <ErrorDisplay>Error Loading Parts</ErrorDisplay>;
		}
		if (loadingParts === true) {
			return <LoadingDisplay>Loading Parts</LoadingDisplay>;
		}
		if (loadingDelete === true) {
			return <LoadingDisplay>Deleting Task</LoadingDisplay>;
		}

		let deleteConfirmation = null;
		if (showDeleteConfirmation === true) {
			deleteConfirmation = this.buildDeleteConfirmation();
		}

		return (
			<Container>
				<Content padder>
					{this.buildInfoSection()}
					{this.buildPartList()}
				</Content>
				{deleteConfirmation}
			</Container>
		);
	}
}
