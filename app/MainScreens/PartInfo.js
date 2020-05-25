import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import { partModel } from '../db/models';

const styles = StyleSheet.create({
	info: {
		marginBottom: 32
	},
	infoItem: {

	},
	controls: {
		flexDirection: 'row',
		justifyContent: 'space-around'
	},
	controlButton: {
		flexBasis: '40%'
	}
});

class PartInfo extends React.Component {
	constructor(props) {
		super(props);
		this.partId = this.props.route.params;
		this.onFocus = this.onFocus.bind(this);
		this.onEditPress = this.onEditPress.bind(this);
		this.onDeletePress = this.onDeletePress.bind(this);
		this.onDeleteConfirm = this.onDeleteConfirm.bind(this);

		this.state = { part: null };
	}

	componentDidMount() {
		this.props.navigation.addListener('focus', this.onFocus);
	}

	onFocus() {
		this.loadPart();
	}

	loadPart() {
		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Loading Part');

		partModel.getPart(this.partId).then(
			(part) => {
				dataMeta.hideLoading();
				if (!part) {
					dataMeta.toastDanger('Part not found');
					return;
				}

				this.setState({ part });
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error loading part');
			}
		);
	}

	onEditPress() {
		this.props.navigation.navigate('Edit Part', this.state.part);
	}

	onDeletePress() {
		this.props.dataMeta.buttonOverlay(
			'Are you sure you want to delete this part',
			'Delete',
			'danger',
			this.onDeleteConfirm
		);
	}

	onDeleteConfirm() {
		const dataMeta = this.props.dataMeta;
		dataMeta.closeButtonOverlay();
		dataMeta.showLoading('Deleating Part');

		partModel.deletePart(this.state.part._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Deleated');
				this.props.navigation.goBack();
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error deleating part');
			}
		);
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true || !this.state.part) {
			return null;
		}

		const part = this.state.part;
		return (
			<Container>
				<Content padder>
					<View style={styles.info}>
						<H1>{part.name}</H1>
						<Text style={styles.infoItem}>{part.noun}</Text>
						<Text style={styles.infoItem}>NSN: {part.nsn}</Text>
					</View>

					<View style={styles.controls}>
						<Button small block style={styles.controlButton} onPress={this.onEditPress}>
							<Text>Edit</Text>
						</Button>
						<Button small block danger style={styles.controlButton} onPress={this.onDeletePress}>
							<Text>DELETE</Text>
						</Button>
					</View>
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(PartInfo);
