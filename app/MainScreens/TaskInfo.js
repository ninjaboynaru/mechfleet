import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import { ErrorDisplay, LoadingDisplay } from '../metaComponents';
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
		this.onEditPress = this.onEditPress.bind(this);
		this.onCompletePress = this.onCompletePress.bind(this);
		this.onAddPartPress = this.onAddPartPress.bind(this);
		this.onDeletePartPress = this.onDeletePartPress.bind(this);
		this.state = { parts: null, loading: true, loadingError: false };
	}

	componentDidMount() {
		db.getPartsById(this.task.associatedParts).then(
			(parts) => {
				this.setState({ parts, loading: false });
			},
			() => {
				this.setState({ loadingError: true });
			}
		);
	}

	onDeletePress() {

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
		const { loading, loadingError } = this.state;

		if (loadingError === true) {
			return <ErrorDisplay>Error Loading Parts</ErrorDisplay>;
		}
		if (loading === true) {
			return <LoadingDisplay>Loading Parts</LoadingDisplay>;
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
