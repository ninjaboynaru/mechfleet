import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, Content, H1, Button, Text } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import db from '../db/db';

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

function PartInfo({ dataMeta, route, navigation }) {
	const part = route.params;
	const onEditPress = () => navigation.navigate('Edit Part', part);

	function onDeleteConfirm() {
		dataMeta.closeButtonOverlay();
		dataMeta.showLoading('Deleating Part');
		db.deletePart(part._id).then(
			() => {
				dataMeta.hideLoading();
				dataMeta.toastSuccess('Part Deleated');
				navigation.navigate('Parts');
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error deleating part');
			}
		);
	}

	function onDeletePress() {
		dataMeta.buttonOverlay(
			'Are you sure you want to delete this part',
			'Delete',
			'danger',
			onDeleteConfirm
		);
	}


	return (
		<Container>
			<Content padder>
				<View style={styles.info}>
					<H1>{part.name}</H1>
					<Text style={styles.infoItem}>{part.noun}</Text>
					<Text style={styles.infoItem}>NSN: {part.NSN}</Text>
				</View>

				<View style={styles.controls}>
					<Button small block style={styles.controlButton} onPress={onEditPress}>
						<Text>Edit</Text>
					</Button>
					<Button small block danger style={styles.controlButton} onPress={onDeletePress}>
						<Text>DELETE</Text>
					</Button>
				</View>
			</Content>
		</Container>
	);
}

export default WithDataMeta(PartInfo);
