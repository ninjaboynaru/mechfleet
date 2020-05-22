import React from 'react';
import { View } from 'react-native';
import { Container, Content, Form, Item, Input, Label, Button, Text } from 'native-base';
import WithDataMeta from '../metaComponents/WithDataMeta';
import db from '../db/db';

const controlsStyle = {
	marginTop: 16,
	flexDirection: 'row',
	justifyContent: 'space-between'
};

class EditPart extends React.Component {
	constructor(props) {
		super(props);
		this.part = this.props.route.params;

		this.onNameChange = this.onNameChange.bind(this);
		this.onNounChange = this.onNounChange.bind(this);
		this.onNsnChange = this.onNsnChange.bind(this);
		this.onSavePress = this.onSavePress.bind(this);
		this.onCancelPress = this.onCancelPress.bind(this);


		if (this.part) {
			const part = this.part;
			this.state = { name: part.name, noun: part.noun, NSN: part.NSN };
		}
		else {
			this.state = { name: '', noun: '', NSN: '' };
			this.props.navigation.setOptions({ title: 'New Part' });
		}
	}

	onNameChange(name) {
		this.setState({ name });
	}

	onNounChange(noun) {
		this.setState({ noun });
	}

	onNsnChange(NSN) {
		this.setState({ NSN });
	}

	onSavePress() {
		const state = this.state;
		const newPart = {
			name: state.name,
			noun: state.noun,
			NSN: state.NSN
		};

		if (this.part) {
			newPart._id = this.part._id;
		}

		const dataMeta = this.props.dataMeta;
		dataMeta.showLoading('Saving Part');

		db.savePart(newPart).then(
			() => {
				dataMeta.toastSuccess('Part Saved');
				this.props.navigation.navigate('Parts');
			},
			() => {
				dataMeta.hideLoading();
				dataMeta.toastDanger('Error saving part');
			}
		);
	}

	onCancelPress() {
		this.props.navigation.goBack();
	}

	render() {
		if (this.props.dataMeta.visibleDisplays.loading === true) {
			return null;
		}

		const { name, noun, NSN } = this.state;
		return (
			<Container>
				<Content padder>
					<Form>
						<Item stackedLabel>
							<Label>Name</Label>
							<Input value={name} onChangeText={this.onNameChange} />
						</Item>
						<Item stackedLabel>
							<Label>Noun</Label>
							<Input value={noun} onChangeText={this.onNounChange} />
						</Item>
						<Item stackedLabel>
							<Label>NSN</Label>
							<Input value={NSN} onChangeText={this.onNsnChange} />
						</Item>
						<View style={controlsStyle}>
							<Button success onPress={this.onSavePress}><Text>Save</Text></Button>
							<Button light onPress={this.onCancelPress}><Text>Cancel</Text></Button>
						</View>
					</Form>
				</Content>
			</Container>
		);
	}
}

export default WithDataMeta(EditPart);
